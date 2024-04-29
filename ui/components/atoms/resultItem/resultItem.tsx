import classNames from "classnames";
import style from "./index.module.css";
import { manropeMedium, manropeSemiBold } from "@/app/fonts";

import { getAccountDomainDetails, reserveName } from "@/app/actions/actions";
import infoIcon from "../../../assets/info.svg";

import Image from "next/image";
import { Star } from "../star";
import Bag from "../bag/bag";
import { useStoreContext } from "@/store";
import { Modals } from "@/components/molecules/modals/modals.types";
import { amount, bag } from "@/comman/constants";
import useWallet from "@/hooks/useWallet";

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
    actions: { openModal, addToBag },
  } = useStoreContext();
  const { accountId } = useWallet();

  const handleInfo = async () => {
    const response = await getAccountDomainDetails(id);
    openModal(Modals.info, {
      data: response,
    });
  };

  const handleBag = async (): Promise<void> => {
    console.log({
      ownerAddress: accountId[0],
      domainName: name,
      expirationTime: 1,
      amount: amount,
    });

    try {
      const response = await reserveName({
        ownerAddress: accountId[0],
        domainName: name,
        expirationTime: 1,
        amount: amount,
      });

      if (response.id) {
        addToBag({
          name: response.domainName,
          years: response.expirationTime,
          amount: response.amount,
          id: response.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionIconsList = {
    [NAME_STATUS.AVAILABLE]: <Bag onClick={handleBag} />,
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
