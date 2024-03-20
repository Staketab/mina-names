import classNames from "classnames";
import SearchIcon from "../../../assets/search.svg";
import Image from "next/image";
import { interMedium } from "@/app/fonts";
import { InputProps, InputVariant } from "./types";

import style from "./index.module.css";

const Input = ({
  onChange,
  placeholder,
  value,
  className,
  type,
  disabled,
  variant,
}: InputProps): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <input
        className={classNames(style.input, className, interMedium.className)}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
      />
      {variant === InputVariant.search && (
        <Image src={SearchIcon} alt="search" className={style.searchIcon} />
      )}
    </div>
  );
};

export default Input;
