import { Button } from "@/components/atoms/button";
import style from "./index.module.css";
import { Variant } from "@/components/atoms/button/types";
import { manropeBold, manropeMedium } from "@/app/fonts";
import appliedIcon from "../../../../assets/applied.svg";
import Image from "next/image";

type TransactionAppliedModalProps = {
  seeTransaction: () => void;
  seeDomains: () => void;
};

const TransactionAppliedModal = ({
  seeDomains,
  seeTransaction,
}: TransactionAppliedModalProps): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.topContent}>
        <Image src={appliedIcon} alt="applied" />
      </div>
      <div className={style.bottomContent}>
        <div className={manropeBold.className}>Transaction applied</div>
        <div className={manropeMedium.className}>
          The Domain was successfully purchased!
        </div>
        <div className={style.buttonsBlock}>
          <Button variant={Variant.cancel} onClick={seeDomains}>
            See Transaction
          </Button>
          <Button variant={Variant.black} onClick={seeTransaction}>
            See Domain
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionAppliedModal;
