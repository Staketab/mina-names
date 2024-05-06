import Image from "next/image";
import alert from "../../../../assets/alert.svg";

import style from "./index.module.css";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { useStoreContext } from "@/store";
import { Modals } from "../modals.types";
import { AccountDomainDetailsResponse } from "@/app/actions/types";

const ConfirmationModal = ({
  icon,
  text,
  accountDomainDetails,
}: {
  icon?: string;
  text?: string;
  accountDomainDetails: AccountDomainDetailsResponse;
}): JSX.Element => {
  const {
    actions: { openModal, closeModal },
  } = useStoreContext();
  const handleNext = () => {
    closeModal();
    openModal(Modals.upload, {
      accountDomainDetails,
    });
  };

  const onClose = (): void => {
    closeModal();
  };
  return (
    <>
      <div className={style.wrapper}>
        <Image src={icon || alert} alt="" width={100} height={100} />
        <div className={style.text}>
          {text ||
            "The image of the domain name will change after the transaction is completed."}
        </div>
        <div className={style.buttonsBlock}>
          <Button text="Cancel" onClick={onClose} variant={Variant.cancel} />
          <Button text="Next" variant={Variant.black} onClick={handleNext} />
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
