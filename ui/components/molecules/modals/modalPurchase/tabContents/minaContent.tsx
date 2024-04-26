import classNames from "classnames";

import style from "./index.module.css";
import { manropeBold, manropeMedium } from "@/app/fonts";

type MinaContentProps = {
  amount: number;
};

const MinaContent = ({ amount }: MinaContentProps): JSX.Element => {
  return (
    <div className={classNames(style.wrapper, manropeMedium.className)}>
      <div>
        <span>1 year registration</span>
        <span>{amount} MINA</span>
      </div>
      <div>
        <span>Est. network fee</span>
        <span>0.00000312 MINA</span>
      </div>
      <div>
        <span>Discount</span>
        <span>0.00000312 MINA</span>
      </div>
      <div className={classNames(manropeBold.className, style.totalSection)}>
        <span className={style.totalText}>Estimated Total</span>
        <span>10.00000312 MINA</span>
      </div>
    </div>
  );
};

export { MinaContent };
