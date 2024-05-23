"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { manropeBold, manropeSemiBold } from "@/app/fonts";
import { CartContent } from "@/components/organisms/cartContent";
import timeIcon from "../../../assets/time.svg";
import Image from "next/image";
import { TimeReservation } from "./timeReservation";

const CartSection = () => {
  return (
    <div className={classNames(style.wrapper, "container")}>
      <div className={manropeBold.className}>
        <div className={style.header}>My Cart</div>
        <span className={classNames(manropeSemiBold.className, style.time)}>
          <Image src={timeIcon} alt="" />
          <TimeReservation />
        </span>
      </div>
      <CartContent />
    </div>
  );
};

export default CartSection;
