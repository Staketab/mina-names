"use client";

import style from "./index.module.css";
import PopupOverlay from "../../popupOverlay";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { pinFile } from "@/app/actions/actions";
import { UploadFile } from "../../uploadFile";
import { FileInput } from "@/components/atoms/input/fileInput";
import { useState } from "react";

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
  open,
  onClose,
  editImg,
}: {
  open: boolean;
  onClose: () => void;
  editImg: (value: string) => Promise<void>;
}): JSX.Element => {
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
    onClose();
  };

  const onTypeError = () => {
    setIsSupported(false);
  };

  return (
    <PopupOverlay
      position="center"
      animation="appear"
      onClose={onClose}
      show={open}
    >
      <div className={style.wrapper}>
        <div>Upload Source Code</div>
        <FileInput
          onChange={handleChange}
          placeholder={file?.name || "Choose File"}
          fileTypes={fileTypes}
          isSupported={isSupported}
          loading={loading}
        />
        <UploadFile
          fileTypes={fileTypes}
          onChange={handleChange}
          onTypeError={onTypeError}
        />
        <div className={style.buttonsBlock}>
          <Button text="Cancel" variant={Variant.cancel} onClick={onClose} />
          <Button
            text="Update"
            variant={Variant.blue}
            disabled={!file}
            onClick={submit}
          />
        </div>
      </div>
    </PopupOverlay>
  );
};

export default UploadModal;
