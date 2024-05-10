import Image from "next/image";
import defaultIcon from "../../../../assets/default.svg";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import classNames from "classnames";
import { interSemiBold, manropeSemiBold } from "@/app/fonts";
import { StaticEllipse } from "../../staticEllipse";
import { monthDayYearTimeFormat } from "@/helpers/timeHelper";

import style from "./index.module.css";
import Link from "next/link";
import { DOMAIN_STATUS, Routs } from "@/comman/types";
import React from "react";
import { CopyIcon } from "@/components/atoms/copyIcon";
import TruncateText from "../../truncateText/truncateText";

type ModalInfoProps = {
  data: {
    domainImg: string | null;
    amount: number;
    domainName: string;
    domainStatus: string;
    expirationTime: number;
    isDefault: boolean;
    isSendToCloudWorker: boolean;
    id: string;
    ownerAddress: string;
    reservationTimestamp: number;
    startTimestamp: number | null;
    transaction: string | null;
  };
};

const ModalInfo = ({ data }: ModalInfoProps): JSX.Element => {
  if (!data) return null;

  const {
    id,
    ownerAddress,
    domainName,
    reservationTimestamp,
    domainImg,
    domainStatus,
  } = data;

  return (
    <div className={classNames(style.content, interSemiBold.className)}>
      <div className={style.topContent}>
        <Image src={domainImg || defaultIcon} alt="" width={100} height={100} />
        <div className={style.header}>
          <TruncateText>{domainName}</TruncateText>
        </div>
      </div>
      <div className={style.bottomContent}>
        <div className={classNames(style.infoItem, manropeSemiBold.className)}>
          <div className={style.bottomContentLeftSide}>
            <span>Domain Owner</span>
            <StaticEllipse
              className={manropeSemiBold.className}
              text={ownerAddress}
              view={{ sm: 10, md: 14, lg: 18 }}
            >
              <CopyIcon value={ownerAddress} />
            </StaticEllipse>
          </div>
          <span className={style.bottomContentRightSide}>
            <Image src={defaultIcon} alt="" width={24} height={20} />
          </span>
        </div>
        <div className={classNames(style.infoItem, manropeSemiBold.className)}>
          <div className={style.bottomContentLeftSide}>
            <span>Creation Time</span>
            <div className={manropeSemiBold.className}>
              {monthDayYearTimeFormat(reservationTimestamp)}
            </div>
          </div>
          <span className={style.bottomContentRightSide}>
            <Image src={defaultIcon} alt="" width={24} height={20} />
          </span>
        </div>
        <div className={classNames(style.infoItem, manropeSemiBold.className)}>
          <div className={style.bottomContentLeftSide}>
            <span>Domain ID</span>
            {id && (
              <StaticEllipse
                className={manropeSemiBold.className}
                text={id}
                view={{ sm: 10, md: 14, lg: 18 }}
              >
                <CopyIcon value={id} />
              </StaticEllipse>
            )}
          </div>
          <span className={style.bottomContentRightSide}>
            <Image src={defaultIcon} alt="" width={24} height={20} />
          </span>
        </div>
        {(domainStatus === DOMAIN_STATUS.ACTIVE || !domainStatus) && (
          <Link href={`${Routs.NAME}/${id}`}>
            <Button text="View Details" variant={Variant.black} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default React.memo(ModalInfo);
