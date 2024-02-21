import Link from "next/link";
import { Logo } from "../../atoms/logo";
import { navList } from "./constants";

import style from "./index.module.css";
import classNames from "classnames";
import { useRouter } from "next/router";
import AccountIcon from "../../atoms/iconComponents/account";

const Navigation = () => {
  const { pathname } = useRouter();

  return (
    <div className={style.wrapper}>
      <Logo />
      <div className={style.navigation}>
        {navList.map(({ url, title, id, icon }) => {
          return (
            <Link
              href={url}
              key={id}
              className={classNames(style.link, "t-inter-medium", {
                [style.active]: pathname.includes(url),
              })}
            >
              <AccountIcon isActive={pathname.includes(url)}/>
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;