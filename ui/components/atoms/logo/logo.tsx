import Image from "next/image";
import LogoIcon from "../../../assets/logo.svg";

import style from "./index.module.css";

const Logo = () => {
  return (
    <div className={style.logo}>
      <Image src={LogoIcon} alt="Mina Names" />
      <span className="t-inter-semi-bold">Mina Names</span>
    </div>
  );
};

export default Logo;
