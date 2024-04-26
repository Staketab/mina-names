import { Button } from "@/components/atoms/button";
import style from "./index.module.css";
import { Variant } from "@/components/atoms/button/types";
import { manropeBold, manropeMedium } from "@/app/fonts";
import failedIcon from "../../../../assets/failed.svg";
import Image from "next/image";

type TransactionAppliedModalProps = {
  tryAgain?: () => void;
};

const TransactionFailedModal = ({
  tryAgain,
}: TransactionAppliedModalProps): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.topContent}>
        <Image src={failedIcon} alt="applied" />
      </div>
      <div className={style.bottomContent}>
        <div className={manropeBold.className}>Transaction failed</div>
        <div className={manropeMedium.className}>
          The Domain has not been purchased!
        </div>
        <div className={style.buttonsBlock}>
          {tryAgain && (
            <Button variant={Variant.black} onClick={tryAgain}>
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionFailedModal;
