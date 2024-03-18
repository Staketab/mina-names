import classNames from "classnames";
import { Button } from "../button";
import { Variant } from "../button/types";
import style from "./index.module.css";
import { interMedium } from "@/app/fonts";
import { useState } from "react";
import { mockData } from "./response.mock";
import { ModalInfo } from "@/components/molecules/modals/modalInfo";
import { ModalPurchase } from "@/components/molecules/modals/modalPurchase";

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
  const [open, setOpen] = useState<boolean>(false);
  const { isReserved, name } = statusName;

  const handleInfo = () => {
    setOpen(true);
  };

  return (
    <div
      className={classNames(style.wrapper, className, interMedium.className)}
    >
      <div>
        {name}
        <span>.mina</span>
        <span
          className={classNames(style.status, interMedium.className, {
            [style.unavailable]: isReserved,
          })}
        >
          {isReserved ? "Taken" : "available"}
        </span>
      </div>
      <Button
        text={isReserved ? "Info" : "Purchase"}
        variant={Variant.blue}
        onClick={handleInfo}
      />
      {isReserved ? (
        <ModalInfo open={open} onClose={() => setOpen(false)} data={mockData} />
      ) : (
        <ModalPurchase
          open={open}
          onClose={() => setOpen(false)}
          name={name}
        />
      )}
    </div>
  );
};

export default ResultItem;
