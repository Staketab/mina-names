import { AccountDomainDetailsResponse } from "@/app/actions/types";
import { WalletConnectPopUpCoreProps } from "../connectWalletButton/walletConnectPopUp/core";
import { PendingModalProps } from "./pendingModal/pendingInfo";

export enum Modals {
  transactionApplied = "transactionApplied",
  transactionFailed = "transactionFailed",
  purchase = "purchase",
  info = "info",
  confirmation = "confirmation",
  upload = "upload",
  walletConnect = "walletConnect",
  pending = 'pending'
}

export type ConfirmationModalProps = {
  icon?: string;
  text?: string;
  accountDomainDetails: AccountDomainDetailsResponse;
};

export type UploadModalProps = {
  accountDomainDetails: AccountDomainDetailsResponse;
};

export interface TransactionAppliedModalProps {
  header: string;
  text?: string;
  button?: {
    action: () => void;
    text: string;
  };
  onClose?: (value?: Modals) => void;
}

export interface TransactionFailedModalProps
  extends TransactionAppliedModalProps {}

export type ModalInfoProps = {
  data: {
    domainImg: string | null;
    amount: number;
    domainName: string;
    domainStatus: string;
    expirationTime: number;
    isDefault: boolean;
    isSendToCloudWorker: boolean;
    id: string;
    ownerAddress: string;
    reservationTimestamp: number;
    startTimestamp: number | null;
    transaction: string | null;
    ipfs: string | null;
    oldMetadata: {
      ipfsImg: string;
    };
  };
};

export type ModalPurchaseProps = {
  name: string;
};

export type ModalData = {
  transactionApplied: TransactionAppliedModalProps;
  transactionFailed: TransactionFailedModalProps;
  purchase: ModalPurchaseProps;
  info: ModalInfoProps;
  confirmation: ConfirmationModalProps;
  upload: UploadModalProps;
  walletConnect: WalletConnectPopUpCoreProps;
  pending: PendingModalProps;
};
