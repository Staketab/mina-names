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
import { DOMAIN_STATUS } from "@/comman/types";
import { addMinaText } from "@/helpers/name.helper";
import { useWallet } from "@/hooks";

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
    state: {
      walletData: { accountId, connectMessage },
    },
  } = useStoreContext();
  const {
    actions: { onConnectWallet },
  } = useWallet();

  const handleInfo = async () => {
    const response = await getAccountDomainDetails(id);
    openModal(Modals.info, {
      data: {
        domainImg: response.domainImg,
        amount: response.amount,
        domainName: response.domainName,
        domainStatus: response.domainStatus,
        expirationTime: response.expirationTime,
        isDefault: response.isDefault,
        isSendToCloudWorker: response.isSendToCloudWorker,
        id: response.id,
        ownerAddress: response.ownerAddress,
        reservationTimestamp: response.reservationTimestamp,
        startTimestamp: response.startTimestamp,
        transaction: response.transaction,
        ipfs: response.ipfs,
        oldMetadata: {
          ipfsImg: response.oldMetadata.ipfsImg,
        },
      },
    });
  };

  const addToBagRequest = async (id?: string): Promise<void> => {
    try {
      const response = await reserveName({
        ownerAddress: id || accountId,
        domainName: name,
        expirationTime: 1,
        amount: amount,
      });

      if (response.id && (id || accountId)) {
        addToBag({
          name: response.domainName,
          years: response.expirationTime,
          amount: response.amount,
          id: response.id,
          key: id || accountId,
        });
        clearInput();
      }
    } catch (error) {}
  };

  const handleBag = async (): Promise<void> => {
    if (!accountId) {
      openModal(Modals.walletConnect, {
        onConnectWallet,
        connectMessage,
        onResolve: (id) => addToBagRequest(id),
      });
    } else {
      addToBagRequest();
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
        {addMinaText(name)}
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
