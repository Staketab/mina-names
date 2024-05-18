"use client";
import { Logo } from "@/components/atoms/logo";
import { ConnectWalletButton } from "@/components/molecules/connectWalletButton";

import style from "./header.styles.module.css";
import { Bag } from "@/components/atoms/bag";
import { BAG_VARIANTS } from "@/components/atoms/bag/bag.type";
import Link from "next/link";
import { Routs } from "@/comman/types";
import { initWalletData, useStoreContext } from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Header = (): JSX.Element => {
  const {
    state: {
      walletData: { accountId },
      bag,
    },
    actions: { initStore },
  } = useStoreContext();
  const currentDomainsByAccount = bag?.[accountId]?.domains || [];
  const pathName = usePathname();
  const isHomePage = pathName === Routs.HOME;

  useEffect(() => {
    const bagStorage = localStorage.getItem("bag");
    const accountStorage = localStorage.getItem("account");
    if (bagStorage || accountStorage) {
      initStore({
        modals: [],
        bag: bagStorage ? JSON.parse(bagStorage) : {},
        walletData: accountStorage
          ? {
              ...JSON.parse(accountStorage),
              accountId: JSON.parse(accountStorage)?.accountId,
            }
          : initWalletData,
      });
    }
  }, []);

  return (
    <header
      className={classNames(style.header, {
        [style.bottomBoard]: !isHomePage,
      })}
    >
      <Logo />
      <div className={style.rightSide}>
        <ConnectWalletButton />
        {accountId && (
          <Link href={`${Routs.CART}`}>
            <Bag
              variant={BAG_VARIANTS.GRADIENT}
              size={currentDomainsByAccount.length}
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
