import Image from "next/image";
import PopupOverlay from "../../popupOverlay";
import alert from "../../../../assets/alert.svg";

import style from "./index.module.css";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { useState } from "react";
import { UploadModal } from "../uploadModal";

const ConfirmationModal = ({
  open,
  onClose,
  icon,
  text,
  editImg,
}: {
  open: boolean;
  onClose: () => void;
  icon?: string;
  text?: string;
  editImg: (value: string) => Promise<void>;
}): JSX.Element => {
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const handleNext = () => {
    setOpenUploadModal(true);
    onClose();
  };
  return (
    <>
      <PopupOverlay
        position="center"
        animation="appear"
        onClose={onClose}
        show={open}
      >
        <div className={style.wrapper}>
          <Image src={icon || alert} alt="" width={100} height={100} />
          <div className={style.text}>
            {text ||
              "The image of the domain name will change after the transaction is completed."}
          </div>
          <div className={style.buttonsBlock}>
            <Button text="Cancel" onClick={onClose} variant={Variant.cancel} />
            <Button text="Next" variant={Variant.blue} onClick={handleNext} />
          </div>
        </div>
      </PopupOverlay>
      <UploadModal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
        editImg={editImg}
      />
    </>
  );
};

export default ConfirmationModal;
