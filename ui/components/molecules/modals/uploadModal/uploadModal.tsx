"use client";
import style from "./index.module.css";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { zkCloudWorkerRequest } from "@/app/actions/actions";
import { UploadFile } from "../../uploadFile";
import { FileInput } from "@/components/atoms/input/fileInput";
import React, { useState } from "react";
import { useStoreContext } from "@/store";
import CryptoJS from "crypto-js";
import { AccountDomainDetailsResponse } from "@/app/actions/types";
import { chain, contractAddress, developer } from "@/comman/constants";
import { Modals } from "../modals.types";
import { useRouter } from "next/navigation";
import { Routs } from "@/comman/types";
import { pinFile } from "@/app/actions/clientActions";
import { IUseWallet } from "@/hooks/useWallet";

interface ImageData {
  size: number;
  sha3_512: string;
  mimeType: string;
  filename: string;
  ipfsHash: string;
}
type DomainTransactionType = "add" | "extend" | "update" | "remove";

interface Transaction {
  operation: DomainTransactionType;
  name: string;
  address: string;
  expiry: number;
  metadata?: string;
  storage?: string;
  oldDomain?: string;
  signature?: string;
}

const transactions: string[] = [];

const fileTypes = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".raw",
  ".svg",
  ".bmp",
  ".ico",
  ".tiff",
  ".webp",
];

const UploadModal = ({
  accountDomainDetails,
}: {
  accountDomainDetails: AccountDomainDetailsResponse;
}): JSX.Element => {
  const router = useRouter();

  const {
    state: {
      walletData: { accountId },
    },
    actions: { closeModal, openModal },
  } = useStoreContext();

  const [file, setFile] = useState<File>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(null);
  const handleChange = async (file: File): Promise<void> => {
    setFile(file);
    setIsSupported(true);
  };

  const submit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      const metadata = {
        name: file.name,
        domainName: accountDomainDetails.domainName,
        keyvalues: {
          id: accountDomainDetails.id,
          type: file.type,
          chain: chain,
          developer: developer,
          contractAddress: contractAddress,
          walletAddress: accountId,
        },
      };

      formData.append("file", file);
      formData.append("pinataMetadata", JSON.stringify(metadata));
      formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

      const ipfsHash = await pinFile(formData);
      if(!ipfsHash) {        
        throw new Error(`IpfsHash does not exist`);
      }

      function readFileAsync(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();

          reader.onload = () => {
            resolve(reader.result);
          };

          reader.onerror = reject;

          reader.readAsArrayBuffer(file);
        });
      }

      const binary = await readFileAsync(file);
      const binaryWA = CryptoJS.lib.WordArray.create(binary);
      var sha3_512 = CryptoJS.SHA3(binaryWA, { outputLength: 512 }).toString(
        CryptoJS.enc.Base64
      );

      const image: ImageData = {
        filename: file.name,
        ipfsHash: ipfsHash,
        size: file.size,
        mimeType: file.type,
        sha3_512: sha3_512,
      };

      let createTxTaskArgs: string = JSON.stringify({
        contractAddress,
      });
  
      const createTxTaskAnswer = await zkCloudWorkerRequest({
        command: "execute",
        task: "createTxTask",
        transactions: [],
        args: createTxTaskArgs,
        metadata: `backend txTask`,
      });      

      const tx: Transaction = {
        operation: "update",
        name: accountDomainDetails.domainName,
        address: accountDomainDetails.ownerAddress,
        oldDomain: accountDomainDetails.oldMetadata.domainMetadata,
        expiry: accountDomainDetails.expirationTime,
        metadata: JSON.stringify({
          image,
          contractAddress: contractAddress,
        }),
      };

      let args: string = JSON.stringify({
        contractAddress,
        tx,
      });

      let answer = await zkCloudWorkerRequest({
        command: "execute",
        task: "prepareSignTransactionData",
        args,
        metadata: `command sign`,
        mode: "async",
      });

      const jobId = answer.jobId;
      let result: string | undefined = undefined;

      const request = async () => {
        while (result === undefined) {
          const answer = await zkCloudWorkerRequest({
            command: "jobResult",
            jobId,
          });

          result = answer.result;

          if (result !== undefined) {
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      };

      await request();

      const tx2 = JSON.parse(result);
      const signatureData = JSON.parse(tx2.signature).signatureData;

      const result2 = await window["mina"]?.signFields({
        message: signatureData,
      });

      const signature = result2.signature;
      tx2.signature = signature;
      transactions.push(JSON.stringify(tx2, null, 2));

      const answer2 = await zkCloudWorkerRequest({
        command: "sendTransactions",
        transactions,
        metadata: "backend txs",
      });

      closeModal(Modals.upload);
      if (answer2[0]) {
        openModal(Modals.transactionApplied, {
          header: "Updating is in progress.",
          button: {
            text: "See Domains",
            action: () => {
              router.push(`${Routs.NAMES}/${accountId}`);
              closeModal();
            },
          },
        });
      } else {
        openModal(Modals.transactionFailed, {
          header: "Updating has failed.",
        });
      }
    } catch (error) {
      closeModal(Modals.upload);
      openModal(Modals.transactionFailed, {
        header: "Updating has failed.",
      });
    }
    setLoading(false);
  };

  const onTypeError = () => {
    setFile(null);
    setIsSupported(false);
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={style.wrapper}>
      <div>Upload Image</div>
      <FileInput
        onChange={handleChange}
        placeholder={file?.name || "Choose File"}
        fileTypes={fileTypes}
        isSupported={isSupported}
        loading={loading}
        tooltipText="Error message"
      />
      <UploadFile
        fileTypes={fileTypes}
        onChange={handleChange}
        onTypeError={onTypeError}
        disabled={loading}
      />
      <div className={style.buttonsBlock}>
        <Button text="Cancel" variant={Variant.cancel} onClick={handleClose} />
        <Button
          text="Update"
          variant={Variant.black}
          disabled={!file || loading}
          onClick={submit}
        />
      </div>
    </div>
  );
};

export default React.memo(UploadModal);
