"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { manropeBold, manropeSemiBold } from "@/app/fonts";
import { CartContent } from "@/components/organisms/cartContent";
import { useStoreContext } from "@/store";

const CartSection = () => {
  const {
    state: { bag },
  } = useStoreContext();
  const domainReservationTime = bag?.reservationTime;
  return (
    <div className={classNames(style.wrapper, "container")}>
      <div className={classNames(manropeBold.className, style.header)}>
        My Cart
        <span className={manropeSemiBold.className}>
          Domain reservation 30:00
        </span>
      </div>
      <CartContent />
    </div>
  );
};

export default CartSection;
