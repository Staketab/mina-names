import classNames from "classnames";
import searchIcon from "../../../assets/search.svg";
import clearIcon from "../../../assets/close.svg";

import Image from "next/image";
import { manropeSemiBold } from "@/app/fonts";
import { InputProps, InputVariant } from "./types";

import style from "./index.module.css";

const Input = ({
  onChange,
  onClear,
  onSubmit,
  placeholder,
  value,
  className,
  type,
  disabled,
  variant,
  maxLength,
  enableClear,
}: InputProps): JSX.Element => {
  const handleClearField = (): void => {
    onClear?.();
    const value = {
      target: {
        value: "",
      },
    } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
    onChange(value);
  };

  return (
    <div className={style.wrapper}>
      <input
        className={classNames(
          style.input,
          className,
          manropeSemiBold.className
        )}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
        maxLength={maxLength}
      />
      <div className={style.actions}>
        {enableClear && value && (
          <Image src={clearIcon} alt="search" onClick={handleClearField} />
        )}
        {variant === InputVariant.search && (
          <div className={style.searchIcon}>
            <Image src={searchIcon} alt="search" onClick={onSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
