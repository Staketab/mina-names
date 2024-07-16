import classNames from "classnames";
import React, { FC, useRef } from "react";
// import StatusFlagBig from "../statusFlagBig";

import styles from "./index.module.css";
import pendingIcon from "@/assets/pending.svg";
import successIcon from "@/assets/success.svg";

import { dayMonthYearTimeFormat } from "@/helpers/timeHelper";
import Image from "next/image";
import { StaticEllipse } from "@/components/molecules/staticEllipse";
import { DOMAIN_STATUS } from "@/comman/types";
import { chain } from "@/comman/constants";
import Link from "next/link";

const getPendingComponent = (message) => (
  <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <Image src={pendingIcon} alt="" width={18} height={18} /> {message}
  </span>
);

const getDescription = (value, hash?: string) => {
  const text = value?.match(/[^\d]+/);
  const number = value?.match(/\d+/);
  return (
    <div className={styles.description}>
      {text} <Link href={`https://minascan.io/${chain}/tx/${hash}`} target="_blank">{number}</Link>
    </div>
  );
};

export type Timelines = { statusTime: number; status: string; hash?: string }[];

type TimelineProps = {
  className?: string;
  isSendToCloudWorker: boolean;
  zkTxId: string | null;
  domainStatus: DOMAIN_STATUS;
  startTimestamp: number;
  timelines: Timelines;
  transaction?: string;
};

const Timeline: FC<TimelineProps> = ({
  timelines,
  className,
  isSendToCloudWorker,
  zkTxId,
  domainStatus,
  startTimestamp,
  transaction,
}) => {
  const refTest = useRef(null);

  const newData = [
    {
      ...(isSendToCloudWorker
        ? { hash: transaction, status: "Paid", statusTime: null }
        : {
            pendingComponent: getPendingComponent("Sending payment.."),
            status: "",
            statusTime: null,
          }),
    },
    ...timelines,
  ]
    .reduce((acc, item, index, array) => {
      const isLastItem = array.length - 1 === index;

      const status = item.status?.toLowerCase();
      const statusTime = item.statusTime;

      if (timelines.length < 1 && isSendToCloudWorker) {
        return [
          ...acc,
          item,
          {
            ...(DOMAIN_STATUS.ACTIVE === domainStatus
              ? {
                  statusTime: startTimestamp,
                  status: "Finalization",
                  description: getDescription("Finalization"),
                }
              : { pendingComponent: getPendingComponent("Finalization..") }),
          },
        ];
      }

      if (status === "received") {
        return [
          ...acc,
          //   { statusTime, status: 'Received' },

          isLastItem && {
            pendingComponent: getPendingComponent("Reserving domain.."),
          },
        ];
      }
      if (status === "pending") {
        return [
          ...acc,
          { statusTime, status: "Received" },
          isLastItem && {
            pendingComponent: getPendingComponent("Creating block.."),
          },
        ];
      }
      if (status.includes("included into block")) {
        return [
          ...acc,
          {
            hash: item?.hash,
            statusTime,
            status: "Block Created",
            description: getDescription(status, item?.hash),
          },
          isLastItem && {
            pendingComponent: getPendingComponent("Validating block.."),
          },
        ];
      }
      if (status.includes("included into validated block")) {
        return [
          ...acc,
          {
            statusTime,
            status: "Block Validated",
            description: getDescription(status, item?.hash),
            hash: item?.hash,
          },
          isLastItem && {
            pendingComponent: getPendingComponent("Proving Block.."),
          },
        ];
      }
      if (status.includes("included into proved block")) {
        return [
          ...acc,
          {
            statusTime,
            status: "Block Proved",
            description: getDescription(status, item?.hash),
            hash: item?.hash,
          },
          isLastItem && DOMAIN_STATUS.ACTIVE !== domainStatus
            ? {
                pendingComponent: getPendingComponent("Finalization.."),
              }
            : {
                statusTime,
                status: "Finalization",
                description: getDescription("Finalization"),
              },
        ];
      }

      return [...acc, item];
    }, [])
    .filter(Boolean);

  const renderTimeItem = ({
    statusTime,
    status,
    hash,
    description,
    isFirst,
  }) => {
    const availableHash = isFirst ? transaction : hash;
    return (
      <>
        <Image src={successIcon} alt="" />
        <div className={styles.timeItem}>
          <span className={styles.time}>
            {dayMonthYearTimeFormat(statusTime)}
          </span>
          <div className={styles.infoTimeItem}>
            {availableHash && (
              <>
                <StaticEllipse
                  isActive
                  link={`https://minascan.io/${chain}/tx/${availableHash}`}
                  text={availableHash}
                  view={{
                    sm: isFirst ? 8 : 4,
                    md: isFirst ? 10 : 4,
                    lg: isFirst ? 10 : 4,
                  }}
                  isCopy
                />
              </>
            )}
            {description && description}
          </div>
        </div>
        <span className={classNames(styles.textStatus, styles.active)}>
          {status}
        </span>
      </>
    );
  };

  return (
    <div className={classNames(styles.wrapper, "full-mobile-width", className)}>
      <div className={styles.dots} />
      <p className={styles.title}>Timeline</p>
      {newData.map(
        (
          { status, statusTime, hash, pendingComponent, description },
          index
        ) => {
          return (
            <div className={styles.item} key={`${status}`} ref={refTest}>
              <div className={styles.itemHeader}>
                {pendingComponent
                  ? pendingComponent
                  : renderTimeItem({
                      statusTime,
                      status,
                      hash,
                      description,
                      isFirst: index === 0,
                    })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Timeline;
