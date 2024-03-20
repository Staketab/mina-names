import classNames from "classnames";
import { Button } from "../button";
import { Variant } from "../button/types";
import style from "./index.module.css";
import { interMedium } from "@/app/fonts";
import { useState } from "react";
import { ModalInfo } from "@/components/molecules/modals/modalInfo";
import { ModalPurchase } from "@/components/molecules/modals/modalPurchase";
import { getAccountDomainDetails } from "@/app/actions/actions";
import { AccountDomainDetailsResponse } from "@/app/actions/types";

const ResultItem = ({
  statusName,
  className,
}: {
  statusName: {
    id: string;
    name: string;
  };
  className: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [accountDomainDetails, setAccountDomainDetails] =
    useState<AccountDomainDetailsResponse>(null);
  const { id, name } = statusName;

  const handleInfo = async () => {
    if (id) {
      const response = await getAccountDomainDetails(id);
      setAccountDomainDetails(response);
    }

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
            [style.unavailable]: id,
          })}
        >
          {id ? "Taken" : "available"}
        </span>
      </div>
      <Button
        text={id ? "Info" : "Purchase"}
        variant={Variant.blue}
        onClick={handleInfo}
      />
      {id ? (
        <ModalInfo
          open={open}
          onClose={() => setOpen(false)}
          data={accountDomainDetails}
        />
      ) : (
        <ModalPurchase open={open} onClose={() => setOpen(false)} name={name} />
      )}
    </div>
  );
};

export default ResultItem;
