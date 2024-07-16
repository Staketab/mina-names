import Image from "next/image";
import { Button } from "../../atoms/button";

import style from "./index.module.css";
import { Variant } from "../../atoms/button/types";
import { manropeMedium, manropeSemiBold } from "@/app/fonts";
import defaultImg from "../../../assets/default.svg";

import Link from "next/link";
import { encode } from "js-base64";
import { DOMAIN_STATUS, Routs } from "@/comman/types";
import { Status } from "@/components/atoms/status";
import { dayMonthYearFormat } from "@/helpers/timeHelper";
import classNames from "classnames";
import TruncateText from "../truncateText/truncateText";

type NameCardProps = {
  img: string;
  name: string;
  id: string;
  domainStatus: DOMAIN_STATUS;
  endTimestamp: number;
  handlePendingStatus?: () => void;
};

const NameCard = ({
  img,
  name,
  id,
  domainStatus,
  endTimestamp,
  handlePendingStatus,
}: NameCardProps): JSX.Element => {
  const base64Data = encode("../../../assets/blur.jpg");
  const isPendingStatus = domainStatus === DOMAIN_STATUS.PENDING;

  const handleCard = () => {
    if (isPendingStatus) {
      handlePendingStatus?.();
    }
  };

  return (
    <div
      className={classNames(style.wrapper, {
        [style.pendingCard]: isPendingStatus,
      })}
      onClick={handleCard}
    >
      <div className={style.imgWrapper}>
        <Image
          src={img || defaultImg}
          alt=""
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={base64Data}
        />
      </div>
      <span className={classNames(manropeSemiBold.className, style.name)}>
        <TruncateText>{name}</TruncateText>
      </span>
      {endTimestamp && domainStatus !== DOMAIN_STATUS.PENDING && (
        <span className={classNames(style.expiration, manropeMedium.className)}>
          Expiration: {dayMonthYearFormat(Number(endTimestamp))}
        </span>
      )}
      {isPendingStatus ? (
        <Status
          status={domainStatus}
          onClick={handlePendingStatus}
          className={style.pendingStatus}
        />
      ) : (
        <Link href={`${Routs.NAME}/${id}`}>
          <Button text="Manage" variant={Variant.grey} />
        </Link>
      )}
    </div>
  );
};

export default NameCard;
