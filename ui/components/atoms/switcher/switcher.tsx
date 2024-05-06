import classNames from "classnames";
import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { interSemiBold, manropeSemiBold } from "@/app/fonts";

const Switcher = ({
  text,
  onClick,
  initialState,
  disabled,
  size = 20,
  padding = 2,
  className,
}: {
  text?: string;
  onClick?: (value: boolean) => void;
  initialState?: boolean;
  disabled?: boolean;
  size?: number;
  padding?: number;
  className?: string;
}): JSX.Element => {
  const [state, setState] = useState(initialState);

  const clickHandler = () => {
    if (disabled) return;
    const newState = !state;
    setState(newState);
    onClick?.(newState);
  };

  const getPlateStyles = () => ({
    set: {
      width: size * 2 + padding * 2 + "px",
      height: size + padding * 2 + "px",
      borderRadius: (size + padding * 2) / 2 + "px",
      backgroundColor: "#1A1A1B",
    },
    disabled: {
      width: size * 2 + padding * 2 + "px",
      height: size + padding * 2 + "px",
      borderRadius: (size + padding * 2) / 2 + "px",
      backgroundColor: "rgba(238, 239, 245, 1)",
    },
    setDisabled: {
      width: size * 2 + padding * 2 + "px",
      height: size + padding * 2 + "px",
      borderRadius: (size + padding * 2) / 2 + "px",
      backgroundColor: "rgba(178, 199, 247, 1)",
    },
    unset: {
      width: size * 2 + padding * 2 + "px",
      height: size + padding * 2 + "px",
      borderRadius: (size + padding * 2) / 2 + "px",
    },
  });

  const getBtnStyles = () => ({
    set: {
      width: size + "px",
      height: size + "px",
      left: `calc(100% - ${size}px - ${padding}px)`,
      top: padding,
      boxShadow: "0px 1px 1px rgba(87, 123, 204, 1)",
    },
    disabled: {
      width: size + "px",
      height: size + "px",
      top: padding,
      left: padding,
      boxShadow: "0px 1px 1px rgba(204, 204, 204, 0.3)",
      backgroundColor: "rgba(247, 247, 250, 1)",
    },
    setDisabled: {
      width: size + "px",
      height: size + "px",
      left: `calc(100% - ${size}px - ${padding}px)`,
      top: padding,
      boxShadow: "0px 1px 1px rgba(87, 123, 204, 0.3)",
      backgroundColor: "rgba(216, 227, 251, 1)",
    },
    unset: {
      top: padding,
      left: padding,
      width: size + "px",
      height: size + "px",
    },
  });

  return (
    <div
      className={classNames(style.switcherComponent, className, manropeSemiBold.className)}
      onClick={clickHandler}
    >
      {text && <p className={style.leftText}>{text}</p>}
      <div
        className={style.switcherComponent__plate}
        style={
          state
            ? disabled
              ? getPlateStyles().setDisabled
              : getPlateStyles().set
            : disabled
            ? getPlateStyles().disabled
            : getPlateStyles().unset
        }
      >
        <div
          className={classNames(style.switcherComponent__btn, {
            [style.switcherComponent__btn_active]: state,
          })}
          style={
            state
              ? disabled
                ? getBtnStyles().setDisabled
                : getBtnStyles().set
              : disabled
              ? getBtnStyles().disabled
              : getBtnStyles().unset
          }
        ></div>
      </div>
    </div>
  );
};

export default Switcher;
