import classNames from "classnames";
import { Button } from "../button";
import { Variant } from "../button/types";
import style from "./index.module.css";
import { interMedium } from "@/app/fonts";

const ResultItem = ({
  statusName,
  className,
}: {
  statusName: {
    isReserved: boolean;
    name: string;
  };
  className: string;
}) => {
  console.log(statusName);

  return (
    <div
      className={classNames(style.wrapper, className, interMedium.className)}
    >
      <div>
        {statusName.name}
        <span>.mina</span>
        <span className={classNames(style.status, interMedium.className, {
          [style.unavailable]: statusName.isReserved
        })}>{statusName.isReserved ? "Not available" : "available"}</span>
      </div>
      <Button text="Purchase" variant={Variant.blue} />
    </div>
  );
};

export default ResultItem;
