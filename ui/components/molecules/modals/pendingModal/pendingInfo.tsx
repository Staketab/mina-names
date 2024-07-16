import { FC, useEffect } from "react";
import { useZkcloudworkerWS } from "@/hooks";
import Timeline, { Timelines } from "@/components/atoms/timeline/timeline";

import styles from "./index.module.css";
import { DOMAIN_STATUS } from "@/comman/types";
import { Loader, LoaderVariant } from "@/components/atoms/loader";
import { useStoreContext } from "@/store";

export type PendingModalProps = {
  isSendToCloudWorker: boolean;
  zkTxId: string | null;
  domainStatus: DOMAIN_STATUS;
  startTimestamp: number | null;
  transaction: string;
};
const PendingModal: FC<PendingModalProps> = (props) => {
  const { isSendToCloudWorker, zkTxId, domainStatus, transaction } = props;
  const {
    state: { additionData },
  } = useStoreContext();

  const { startNats, statuses, loading } = useZkcloudworkerWS();

  const availableZkTxId = zkTxId || additionData?.zkTxId;
  const availableDomainStatus = zkTxId
    ? domainStatus
    : additionData?.domainStatus;

  const transactionPay = transaction || additionData?.transaction;

  useEffect(() => {
    if (availableZkTxId) {
      startNats(availableZkTxId);
    }
  }, [availableZkTxId]);

  if (loading && zkTxId) {
    return <Loader variant={LoaderVariant.CIRCLE} className={styles.loader} />;
  }
  return (
    <div className={styles.wrapper}>
      <Timeline
        timelines={statuses}
        {...props}
        zkTxId={availableZkTxId}
        isSendToCloudWorker={isSendToCloudWorker || additionData?.zkTxId}
        domainStatus={availableDomainStatus}
        transaction={transactionPay}
      />
    </div>
  );
};

export default PendingModal;
