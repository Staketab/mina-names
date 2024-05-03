"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { manropeBold, manropeSemiBold } from "@/app/fonts";
import { CartContent } from "@/components/organisms/cartContent";
import { useStoreContext } from "@/store";
import { useEffect, useState } from "react";
import { getTimeDifference } from "@/helpers/timeHelper";
import { deleteName } from "@/app/actions/actions";
import { DATA_STATUS } from "@/comman/types";

const CartSection = () => {
  const {
    state: {
      bag: { reservationTime, domains },
    },
    actions: { deleteFromBag },
  } = useStoreContext();

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    if (reservationTime) {
      setInterval(() => {
        const result = getTimeDifference(Number(reservationTime));
        if (!result) {
          domains.forEach(({ id }) => deleteFromBag(id));
        }
        setTime(result);
      }, 1000);
    }
  }, [reservationTime]);

  return (
    <div className={classNames(style.wrapper, "container")}>
      <div className={classNames(manropeBold.className, style.header)}>
        My Cart
        <span className={manropeSemiBold.className}>
          Domain reservation {time}
        </span>
      </div>
      <CartContent />
    </div>
  );
};

export default CartSection;
