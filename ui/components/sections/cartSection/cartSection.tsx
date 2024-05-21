"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { manropeBold, manropeSemiBold } from "@/app/fonts";
import { CartContent } from "@/components/organisms/cartContent";
import { useStoreContext } from "@/store";
import { useEffect, useState } from "react";
import { getTimeDifference } from "@/helpers/timeHelper";
import timeIcon from "../../../assets/time.svg";
import Image from "next/image";

const CartSection = () => {
  const {
    state: {
      bag,
      walletData: { accountId },
    },
    actions: { deleteFromBag },
  } = useStoreContext();
  const currentBagByAccount = bag?.[accountId];
  const reservationTime = currentBagByAccount?.reservationTime;
  const domains = currentBagByAccount?.domains || [];

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    if (!reservationTime || !domains.length) {
      setTime("");
      return;
    }
    const interval = setInterval(() => {
      const result = getTimeDifference(Number(reservationTime));
      if (!result) {
        domains.forEach(({ id }) => deleteFromBag({id: id, key: accountId}));
      }
      setTime(result);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [reservationTime, domains]);

  return (
    <div className={classNames(style.wrapper, "container")}>
      <div className={manropeBold.className}>
        <div className={style.header}>My Cart</div>
        <span className={classNames(manropeSemiBold.className, style.time)}>
          <Image src={timeIcon} alt="" />
          <span> Domain reservation {time}</span>
        </span>
      </div>
      <CartContent />
    </div>
  );
};

export default CartSection;
