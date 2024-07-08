import Image from "next/image";
import defaultIcon from "../../../../assets/default.svg";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import classNames from "classnames";
import { manropeBold, manropeSemiBold } from "@/app/fonts";
import { StaticEllipse } from "../../staticEllipse";
import { monthDayYearTimeFormat } from "@/helpers/timeHelper";

import style from "./index.module.css";
import Link from "next/link";
import { DOMAIN_STATUS, Routs } from "@/comman/types";
import React, { ReactNode } from "react";
import TruncateText from "../../truncateText/truncateText";
import { addMinaText } from "@/helpers/name.helper";
import { useRouter } from "next/navigation";
import { ModalInfoProps } from "../modals.types";
import { chain } from "@/comman/constants";

const ModalInfo = ({ data }: ModalInfoProps): JSX.Element => {
  const router = useRouter();

  if (!data) return null;

  const {
    id,
    ownerAddress,
    domainName,
    reservationTimestamp,
    domainStatus,
    ipfs,
    oldMetadata,
  } = data;

  const ipfsImgHash = JSON.parse(
    oldMetadata.ipfsImg
  )?.linkedObject?.storage.slice(2);

  const domainImg =
    ipfsImgHash && `https://gateway.pinata.cloud/ipfs/${ipfsImgHash}`;

  const renderContentItem = ({
    header,
    content,
    url,
    hiddenIcon,
    action,
  }: {
    header: string;
    content: ReactNode;
    url?: string;
    hiddenIcon?: boolean;
    action?: () => void;
  }): JSX.Element => {
    return (
      <div className={classNames(style.infoItem, manropeSemiBold.className)}>
        <div className={style.bottomContentLeftSide}>
          <span className={style.leftSideHeader}>{header}</span>
          {content}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            className={style.bottomContentRightSide}
          >
            <Image src={defaultIcon} alt="" width={24} height={20} />
          </a>
        )}
        {action && (
          <span onClick={action} className={style.bottomContentRightSide}>
            <Image src={defaultIcon} alt="" width={24} height={20} />
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={classNames(style.content, manropeBold.className)}>
      <div className={classNames(style.topContent, manropeBold.className)}>
        <Image src={domainImg || defaultIcon} alt="" width={100} height={100} />
        <div className={style.header}>
          <TruncateText className={manropeBold.className}>
            {addMinaText(domainName)}
          </TruncateText>
        </div>
      </div>
      <div className={style.bottomContent}>
        {renderContentItem({
          header: "Domain Owner",
          url: `https://minascan.io/${chain}/account/${ownerAddress}/txs`,
          content: (
            <StaticEllipse
              className={manropeSemiBold.className}
              text={ownerAddress || ""}
              view={{ sm: 10, md: 14, lg: 18 }}
              link={`${Routs.NAMES}/${ownerAddress}`}
            />
          ),
        })}
        {renderContentItem({
          header: "Creation Time",
          hiddenIcon: true,
          content: (
            <div className={manropeSemiBold.className}>
              {monthDayYearTimeFormat(reservationTimestamp)}
            </div>
          ),
        })}
        {renderContentItem({
          header: "IPFS",
          url: ipfs && `https://gateway.pinata.cloud/ipfs/${ipfs}`,
          hiddenIcon: !ipfs,
          content: (
            <StaticEllipse
              className={manropeSemiBold.className}
              text={ipfs || "-"}
              view={{ sm: 10, md: 14, lg: 18 }}
            />
          ),
        })}
        {renderContentItem({
          header: "Domain ID",
          hiddenIcon: true,
          content: id && (
            <StaticEllipse
              className={manropeSemiBold.className}
              text={id}
              view={{ sm: 10, md: 14, lg: 18 }}
            />
          ),
        })}
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
