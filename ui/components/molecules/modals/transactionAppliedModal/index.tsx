import { Button } from "@/components/atoms/button";
import style from "./index.module.css";
import { Variant } from "@/components/atoms/button/types";
import { manropeBold, manropeMedium } from "@/app/fonts";
import appliedIcon from "../../../../assets/applied.svg";
import closeIcon from "../../../../assets/close.svg";
import Image from "next/image";
import { Modals } from "../modals.types";

const TransactionAppliedModal = ({
  header,
  text,
  button,
  onClose,
}: {
  header: string;
  text?: string;
  button?: {
    action: () => void;
    text: string;
  };
  onClose: (value?: Modals) => void;
}): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.topContent}>
        <Image src={appliedIcon} alt="applied" />
      </div>
      <Image
        src={closeIcon}
        alt="close"
        width={24}
        height={24}
        className={style.closeIcon}
        onClick={() => onClose(Modals.transactionApplied)}
      />
      <div className={style.bottomContent}>
        <div className={manropeBold.className}>
          {header || "Transaction applied"}
        </div>
        {text && <div className={manropeMedium.className}>{text}</div>}
        {button && (
          <div className={style.buttonsBlock}>
            <Button variant={Variant.black} onClick={button.action}>
              {button.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionAppliedModal;
