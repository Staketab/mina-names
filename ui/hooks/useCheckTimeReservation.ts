import { getTimeDifference } from "@/helpers/timeHelper";
import { useStoreContext } from "@/store";
import { useEffect, useState } from "react";

const useCheckTimeReservation = (): string => {
  const [time, setTime] = useState<string>("");
  const {
    state: {
      walletData: { accountId },
      bag,
    },
    actions: { deleteFromBag },
  } = useStoreContext();

  const currentBagByAccount = bag?.[accountId];
  const reservationTime = currentBagByAccount?.reservationTime;
  const domains = currentBagByAccount?.domains || [];

  useEffect(() => {
    if (!reservationTime || !domains.length) {
      setTime("");
      return;
    }
    const interval = setInterval(() => {
      const result = getTimeDifference(Number(reservationTime));
      if (!result) {
        domains.forEach(({ id }) => deleteFromBag({ id: id, key: accountId }));
      }
      setTime(result);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [reservationTime, domains]);

  return time
};

export { useCheckTimeReservation };
