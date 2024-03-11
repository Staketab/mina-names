import Image from "next/image";
import PopupOverlay from "../../popupOverlay";
import icon from "../../../../assets/logo.svg";
import closeIcon from "../../../../assets/close.svg";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import classNames from "classnames";
import { interMedium, interSemiBold } from "@/app/fonts";
import { StaticEllipse } from "../../staticEllipse";
import { monthDayYearTimeFormat } from "@/helpers/timeHelper";

import style from "./index.module.css";
import Link from "next/link";
import { defaultDomainNameId } from "@/comman/constants";

type ModalInfoProps = {
  open: boolean;
  onClose: () => void;
  data: {
    id: string;
    ownerAddress: string;
    transaction: string;
    domainName: string;
    domainImg: string;
    amount: number;
    reservationTimestamp: number;
    expirationTime: number;
    startTimestamp: number;
    domainStatus: string;
    isSendToCloudWorker: boolean;
    isDefault: boolean;
  };
};

const ModalInfo = ({ open, onClose, data }: ModalInfoProps): JSX.Element => {
  const {
    ownerAddress,
    domainName,
    reservationTimestamp,
    domainImg,
    transaction,
  } = data;

  return (
    <PopupOverlay
      position="center"
      animation="appear"
      onClose={onClose}
      show={open}
    >
      <div className={classNames(style.content, interSemiBold.className)}>
        <Image
          src={closeIcon}
          alt=""
          className={style.closeIcon}
          onClick={onClose}
          width={240}
          height={240}
        />
        <Image src={icon} alt="" />
        <div className={style.header}>{domainName}</div>
        <div className={style.infoWrapper}>
          <div className={classNames(style.infoItem, interMedium.className)}>
            <span>Domain Owner</span>
            <StaticEllipse
              className={interSemiBold.className}
              text={ownerAddress}
              view={{ sm: 10, md: 14, lg: 18 }}
            />
          </div>
          <div className={classNames(style.infoItem, interMedium.className)}>
            <span>Creation Time</span>
            <div className={interSemiBold.className}>
              {monthDayYearTimeFormat(reservationTimestamp)}
            </div>
          </div>
          <div className={classNames(style.infoItem, interMedium.className)}>
            <span>Creation Transaction</span>
            <StaticEllipse
              className={interSemiBold.className}
              text={transaction}
              view={{ sm: 10, md: 14, lg: 18 }}
            />
          </div>
        </div>
        <Link href={`/account_details/${defaultDomainNameId}`}>
          <Button text="View Details" variant={Variant.blue} />
        </Link>
      </div>
    </PopupOverlay>
  );
};

export default ModalInfo;
