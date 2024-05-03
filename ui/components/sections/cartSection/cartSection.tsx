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
      bag: { reservationTime, domains },
    },
    actions: { deleteFromBag },
  } = useStoreContext();

  const [time, setTime] = useState<string>("");
  console.log(reservationTime);

  useEffect(() => {
    if (!reservationTime) {
      setTime("");
      return;
    }
    const interval = setInterval(() => {
      const result = getTimeDifference(Number(reservationTime));
      if (!result) {
        domains.forEach(({ id }) => deleteFromBag(id));
      }
      setTime(result);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [reservationTime]);

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
