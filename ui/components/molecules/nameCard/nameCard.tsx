import Image from "next/image";
import { Button } from "../../atoms/button";

import style from "./index.module.css";
import { Variant } from "../../atoms/button/types";
import { manropeMedium, manropeSemiBold } from "@/app/fonts";
import defaultImg from "../../../assets/domainImg.svg";

import Link from "next/link";
import { encode } from "js-base64";
import { DOMAIN_STATUS, Routs } from "@/comman/types";
import { Status } from "@/components/atoms/status";
import { dayMonthYearFormat } from "@/helpers/timeHelper";
import classNames from "classnames";

type NameCardProps = {
  img: string;
  name: string;
  id: string;
  domainStatus: DOMAIN_STATUS;
  endTimestamp: number;
};

const NameCard = ({
  img,
  name,
  id,
  domainStatus,
  endTimestamp,
}: NameCardProps): JSX.Element => {
  const base64Data = encode("../../../assets/blur.jpg");
  return (
    <div className={style.wrapper}>
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
      <span className={manropeSemiBold.className}>{name}</span>
      {endTimestamp && domainStatus !== DOMAIN_STATUS.PENDING && (
        <span className={classNames(style.expiration, manropeMedium.className)}>
          Expiration: {dayMonthYearFormat(Number(endTimestamp))}
        </span>
      )}
      {domainStatus === DOMAIN_STATUS.PENDING ? (
        <Status status={domainStatus} />
      ) : (
        <Link href={`${Routs.NAME}/${id}`}>
          <Button text="Manage" variant={Variant.grey} />
        </Link>
      )}
    </div>
  );
};

export default NameCard;
