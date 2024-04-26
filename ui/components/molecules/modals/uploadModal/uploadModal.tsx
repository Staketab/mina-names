"use client";

import style from "./index.module.css";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { pinFile } from "@/app/actions/actions";
import { UploadFile } from "../../uploadFile";
import { FileInput } from "@/components/atoms/input/fileInput";
import React, { useState } from "react";
import { useStoreContext } from "@/store";

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
  editImg,
}: {
  editImg: (value: string) => Promise<void>;
}): JSX.Element => {
  const {
    actions: { closeModal },
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
      formData.append("file", file);
      const ipfsHash = await pinFile(formData);
      await editImg(ipfsHash);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    closeModal();
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
      <div>Upload Source Code</div>
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
      />
      <div className={style.buttonsBlock}>
        <Button text="Cancel" variant={Variant.cancel} onClick={handleClose} />
        <Button
          text="Update"
          variant={Variant.blue}
          disabled={!file}
          onClick={submit}
        />
      </div>
    </div>
  );
};

export default React.memo(UploadModal);
