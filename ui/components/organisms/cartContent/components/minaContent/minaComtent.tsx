import classNames from "classnames";
import style from "./index.module.css";
import { manropeBold, manropeMedium } from "@/app/fonts";
import { fees } from "@/comman/constants";

const MinaContent = ({ amount }: { amount: number }): JSX.Element => {
  return (
    <div className={classNames(style.wrapper, manropeMedium.className)}>
      <div>
        <span>1 year registration</span>
        <span>-</span>
      </div>
      <div>
        <span>Est. network fee</span>
        <span>{fees.default} MINA</span>
      </div>
      <div>
        <span>Discount</span>
        <span>-</span>
      </div>
      <div className={classNames(manropeBold.className, style.totalSection)}>
        <span className={style.totalText}>Estimated Total</span>
        <span>{amount + fees.default} MINA</span>
      </div>
    </div>
  );
};

export { MinaContent };
