import classNames from "classnames";
import { Button } from "../button";
import { Variant } from "../button/types";
import style from "./index.module.css";

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
  return (
    <div className={classNames(style.wrapper, className, "t-inter-medium")}>
      <div>
        {statusName.name}
        <span>.mina</span>
      </div>
      <Button text="Purchase" variant={Variant.blue} />
    </div>
  );
};

export default ResultItem;
