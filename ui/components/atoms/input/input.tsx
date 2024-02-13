import classNames from "classnames";
import SearchIcon from "../../../assets/search.svg";
import style from "./index.module.css";
import Image from "next/image";

export enum InputVariant {
  search = "search",
}

type InputProps = {
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  placeholder: string;
  value: string | number;
  className?: string;
  type?: string;
  disabled?: boolean;
  variant?: InputVariant;
};

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
        className={classNames(style.input, className, 't-inter-medium')}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
      />
      {variant === InputVariant.search && <Image src={SearchIcon} alt="search" className={style.searchIcon}/>}
    </div>
  );
};

export default Input;
