import { AccountDomainDetailsResponse } from "@/app/actions/types";
import style from "./index.module.css";
import { manropeSemiBold, robotoSemiBold } from "@/app/fonts";
import classNames from "classnames";
import { dayMonthYearTimeFormat } from "@/helpers/timeHelper";
import { StaticEllipse } from "@/components/molecules/staticEllipse";
import { CopyIcon } from "@/components/atoms/copyIcon";
import React, { ReactNode } from "react";
import defaultIcon from "../../../../../assets/default.svg";
import { Routs } from "@/comman/types";
import Image from "next/image";
import Link from "next/link";
import { chain } from "@/comman/constants";

const ProfileContent = ({
  accountDomainDetails,
}: {
  accountDomainDetails: AccountDomainDetailsResponse;
}): JSX.Element => {
  const itemRender = ({
    title,
    value,
    isEllipse,
    link,
    icon,
  }: {
    title: string;
    value?: any;
    isEllipse?: boolean;
    link?: string;
    icon?: string;
  }): JSX.Element => {
    return (
      <div className={style.item}>
        <div>{title}</div>
        {isEllipse ? (
          <>
            <StaticEllipse
              className={classNames(
                robotoSemiBold.className,
                style.staticEllipse
              )}
              text={value}
              view={{ sm: 10, md: 14, lg: 18 }}
              link={link}
            />
            <CopyIcon className={style.copyIcon} value={value} />
          </>
        ) : (
          <div>{value}</div>
        )}
        {icon && (
          <Link
            href={`https://minascan.io/${chain}/account/${value}/txs`}
            target="_blank"
          >
            <Image src={icon} alt="" width={20} className={style.icon} />
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className={classNames(style.wrapper, manropeSemiBold.className)}>
      {itemRender({
        title: "Owner",
        value: accountDomainDetails.ownerAddress,
        link: `${Routs.NAMES}/${accountDomainDetails.ownerAddress}`,
        isEllipse: true,
        icon: defaultIcon,
      })}
      {itemRender({
        title: "IPFS",
        value: accountDomainDetails.ipfs && (
          <a
            href={`https://gateway.pinata.cloud/ipfs/${accountDomainDetails.ipfs}`}
            target="_blank"
          >
            {accountDomainDetails.ipfs}
          </a>
        ),
      })}
      {itemRender({
        title: "Creation Time",
        value: dayMonthYearTimeFormat(accountDomainDetails.startTimestamp),
      })}
      {itemRender({
        title: "Domain ID",
        value: accountDomainDetails.id,
        isEllipse: true,
      })}
      {itemRender({
        title: "Creation Transaction",
        value: accountDomainDetails.transaction,
        link: `https://minascan.io/${chain}/tx/${accountDomainDetails.transaction}`,
        isEllipse: true,
      })}
      {itemRender({
        title: "Expiration Time",
        value: dayMonthYearTimeFormat(accountDomainDetails.endTimestamp),
      })}
    </div>
  );
};

export { ProfileContent };
