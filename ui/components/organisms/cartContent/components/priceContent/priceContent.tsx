import classNames from "classnames";
import style from "./index.module.css";
import { manropeBold, manropeMedium } from "@/app/fonts";
import { amount, fees } from "@/comman/constants";

const PriceContent = ({
  amount: currentAmount,
  currency,
  amountByYear,
}: {
  amount: number;
  currency: "MINA" | "USD";
  amountByYear: number;
}): JSX.Element => {
  return (
    <div className={classNames(style.wrapper, manropeMedium.className)}>
      <div>
        <span>1 year registration</span>
        <span>
          {amountByYear} {currency}
        </span>
      </div>
      <div>
        <span>Est. network fee</span>
        <span>
          {fees.default} {currency}
        </span>
      </div>
      <div>
        <span>Discount</span>
        <span>-</span>
      </div>
      <div className={classNames(manropeBold.className, style.totalSection)}>
        <span className={style.totalText}>Estimated Total</span>
        <span>
          {currentAmount + fees.default} {currency}
        </span>
      </div>
    </div>
  );
};

export { PriceContent };
