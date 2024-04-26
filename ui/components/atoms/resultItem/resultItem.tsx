import classNames from "classnames";
import style from "./index.module.css";
import { manropeMedium, manropeSemiBold } from "@/app/fonts";

import { getAccountDomainDetails } from "@/app/actions/actions";
import infoIcon from "../../../assets/info.svg";

import Image from "next/image";
import { Star } from "../star";
import Bag from "../bag/bag";
import { useStoreContext } from "@/store";
import { Modals } from "@/components/molecules/modals/modals.types";

enum NAME_STATUS {
  AVAILABLE = "available",
  TAKEN = "taken",
}

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
  const { id, name } = statusName;
  const {
    actions: { openModal },
  } = useStoreContext();
  const handleInfo = async () => {
    const response = await getAccountDomainDetails(id);
    openModal(Modals.info, {
      data: response,
    });
  };

  const actionIconsList = {
    [NAME_STATUS.AVAILABLE]: (
      <Bag
        onClick={() =>
          openModal(Modals.purchase, {
            name: name,
          })
        }
      />
    ),
    [NAME_STATUS.TAKEN]: <Image src={infoIcon} alt="" onClick={handleInfo} />,
  };

  const status = id ? NAME_STATUS.TAKEN : NAME_STATUS.AVAILABLE;
  const disabled = false;

  return (
    <div
      className={classNames(
        style.wrapper,
        className,
        manropeSemiBold.className
      )}
    >
      <div>
        {name}.mina
        <span
          className={classNames(style.status, manropeMedium.className, {
            [style.unavailable]: id,
          })}
        >
          {id ? "Taken" : "available"}
        </span>
      </div>
      <div className={style.rightSide}>
        <Star />
        <span className={style.actionIcon} aria-disabled={disabled}>
          {actionIconsList[status]}
        </span>
      </div>
    </div>
  );
};

export default ResultItem;
