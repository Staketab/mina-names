"use client";
import { Logo } from "@/components/atoms/logo";
import { ConnectWalletButton } from "@/components/molecules/connectWalletButton";

import style from "./header.styles.module.css";
import { Bag } from "@/components/atoms/bag";
import { BAG_VARIANTS } from "@/components/atoms/bag/bag.type";
import Link from "next/link";
import { Routs } from "@/comman/types";
import {  useStoreContext } from "@/store";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import {  useCheckTimeReservation } from "@/hooks";

const Header = (): JSX.Element => {
  const {
    state: { walletData, bag },
  } = useStoreContext();

  const time = useCheckTimeReservation();
  const currentBagByAccount = bag?.[walletData.accountId];

  const pathName = usePathname();
  const isHomePage = pathName === Routs.HOME;


  const domains = currentBagByAccount?.domains || [];

  return (
    <header
      className={classNames(style.header, {
        [style.bottomBoard]: !isHomePage,
      })}
    >
      <Logo />
      <div className={style.rightSide}>
        <ConnectWalletButton />
        {walletData.accountId && (
          <Link href={`${Routs.CART}`}>
            <Bag
              variant={BAG_VARIANTS.GRADIENT}
              size={time ? domains.length : 0}
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
