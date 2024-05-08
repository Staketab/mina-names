import { AccountDomainDetailsResponse } from "@/app/actions/types";
import style from "./index.module.css";
import { manropeSemiBold, robotoSemiBold } from "@/app/fonts";
import classNames from "classnames";
import { dayMonthYearTimeFormat } from "@/helpers/timeHelper";
import { StaticEllipse } from "@/components/molecules/staticEllipse";
import { CopyIcon } from "@/components/atoms/copyIcon";
import React, { ReactNode } from "react";

const ProfileContent = ({
  accountDomainDetails,
}: {
  accountDomainDetails: AccountDomainDetailsResponse;
}): JSX.Element => {
  const itemRender = ({
    title,
    value,
    isEllipse,
  }: {
    title: string;
    value?: any;
    isEllipse?: boolean;
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
            />
            <CopyIcon className={style.copyIcon} value={value} />
          </>
        ) : (
          <div>{value}</div>
        )}
      </div>
    );
  };
  return (
    <div className={classNames(style.wrapper, manropeSemiBold.className)}>
      {itemRender({
        title: "Owner",
        value: accountDomainDetails.ownerAddress,
        isEllipse: true,
      })}
      {itemRender({
        title: "IPFS",
        value: accountDomainDetails.ipfs && (
          <a
            href={`https://gateway.pinata.cloud/ipfs/${accountDomainDetails.ipfs}`}
            target="_blank"
          >
            {`https://gateway.pinata.cloud/ipfs/${accountDomainDetails.ipfs}`}
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
