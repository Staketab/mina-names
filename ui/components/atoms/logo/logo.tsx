import Image from "next/image";
import LogoIcon from "../../../assets/logo.svg";

import style from "./index.module.css";
import Link from "next/link";

const Logo = () => {
  return (
    <div className={style.logo}>
      <Link href={"/"}>
        <Image src={LogoIcon} alt="Mina Names" />
        <span className="t-inter-semi-bold">Mina Names</span>
      </Link>
    </div>
  );
};

export default Logo;
