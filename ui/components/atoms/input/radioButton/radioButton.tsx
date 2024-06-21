import classNames from "classnames";
import style from "./index.module.css";
import { interSemiBold } from "@/app/fonts";
import React, { ChangeEvent } from "react";

const RadioButton = ({
  value,
  group,
  selectedValue,
  onChange,
  children,
  ...props
}: {
  value: string;
  group: string;
  selectedValue: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  children: string | React.ReactNode;
}): JSX.Element => {
  return (
    <div className={classNames(style.wrapper, interSemiBold.className)}>
      <input
        type="radio"
        id={`${group}-${value}`}
        className={style.radioButton}
        name={group}
        value={value}
        checked={selectedValue === value}
        onChange={onChange}
        {...props}
      />
      <label
        htmlFor={`${group}-${value}`}
        className={classNames(style.radioLabel, {
          [style.selected]: selectedValue === value,
        })}
      >
        {children}
      </label>
    </div>
  );
};

export { RadioButton };
