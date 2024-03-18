"use client";
import Link from "next/link";
import { Logo } from "../../atoms/logo";
import { navList } from "./constants";

import style from "./index.module.css";
import classNames from "classnames";
import AccountIcon from "../../atoms/iconComponents/account";
import { usePathname } from "next/navigation";
import { interMedium } from "@/app/fonts";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className={style.wrapper}>
      <Logo />
      <div className={style.navigation}>
        {navList.map(({ url, title, id, icon }) => {
          return (
            <Link
              href={url}
              key={id}
              className={classNames(style.link, interMedium.className, {
                [style.active]: pathname.includes(url),
              })}
            >
              <AccountIcon isActive={pathname.includes(url)} />
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
