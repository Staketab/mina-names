"use client";

import style from "./index.module.css";
import PopupOverlay from "../../popupOverlay";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { pinFile } from "@/app/actions/actions";
import { UploadFile } from "../../uploadFile";
import { FileInput } from "@/components/atoms/input/fileInput";

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
  const handleChange = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    const ipfsHash = await pinFile(formData);
    editImg(ipfsHash);
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
          placeholder="Choose .zip File"
          fileTypes={fileTypes}
        />
        <UploadFile fileTypes={fileTypes} onChange={handleChange} />
        <div className={style.buttonsBlock}>
          <Button text="Cancel" variant={Variant.cancel} onClick={onClose} />
          <Button text="Update" variant={Variant.blue} disabled />
        </div>
      </div>
    </PopupOverlay>
  );
};

export default UploadModal;
