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
import { amount } from "@/comman/constants";
import useWallet from "@/hooks/useWallet";
import { DOMAIN_STATUS } from "@/comman/types";

const ResultItem = ({
  statusName,
  className,
  clearInput,
}: {
  statusName: {
    id: string;
    name: string;
    status: DOMAIN_STATUS;
  };
  clearInput: () => void;

  className: string;
}) => {
  const { id, name, status } = statusName;
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
        clearInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionIconsList = {
    bag: <Bag onClick={handleBag} />,
    info: <Image src={infoIcon} alt="" onClick={handleInfo} />,
  };

  const nameStatusText = {
    [DOMAIN_STATUS.ACTIVE]: (
      <span className={classNames(style.status, style.activeStatus)}>
        TAKEN
      </span>
    ),
    [DOMAIN_STATUS.PENDING]: (
      <span className={classNames(style.status, style.pendingStatus)}>
        PENDING
      </span>
    ),
    [DOMAIN_STATUS.RESERVED]: (
      <span className={classNames(style.status, style.pendingStatus)}>
        RESERVED
      </span>
    ),
    default: (
      <span className={classNames(style.status, style.availableStatus)}>
        AVAILABLE
      </span>
    ),
  };

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
        {name}
        {nameStatusText[status] || nameStatusText.default}
      </div>
      <div className={style.rightSide}>
        <Star />
        <span className={style.actionIcon} aria-disabled={disabled}>
          {!status ? actionIconsList.bag : actionIconsList.info}
        </span>
      </div>
    </div>
  );
};

export default ResultItem;
