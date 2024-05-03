import { Button } from "@/components/atoms/button";
import style from "./index.module.css";
import { Variant } from "@/components/atoms/button/types";
import { manropeBold, manropeMedium } from "@/app/fonts";
import failedIcon from "../../../../assets/failed.svg";
import Image from "next/image";

type TransactionAppliedModalProps = {
  header: string;
  text?: string;
  button?: {
    text: string;
    action: () => void;
  };
};

const TransactionFailedModal = ({
  header,
  text,
  button,
}: TransactionAppliedModalProps): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.topContent}>
        <Image src={failedIcon} alt="applied" />
      </div>
      <div className={style.bottomContent}>
        <div className={manropeBold.className}>{header}</div>
        {text && <div className={manropeMedium.className}>{text}</div>}
        <div className={style.buttonsBlock}>
          {button && (
            <Button variant={Variant.black} onClick={button.action}>
              {button.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionFailedModal;
