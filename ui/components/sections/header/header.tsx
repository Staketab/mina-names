"use client";
import { Logo } from "@/components/atoms/logo";
import { ConnectWalletButton } from "@/components/molecules/connectWalletButton";

import style from "./header.styles.module.css";
import { Bag } from "@/components/atoms/bag";
import { BAG_VARIANTS } from "@/components/atoms/bag/bag.type";
import Link from "next/link";
import { Routs } from "@/comman/types";
import { useStoreContext } from "@/store";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Header = (): JSX.Element => {
  useLocalStorage();
  const {
    state: {
      bag: { domains },
    },
  } = useStoreContext();
  return (
    <header className={style.header}>
      <Logo />
      <div className={style.rightSide}>
        <ConnectWalletButton />
        <Link href={`${Routs.CART}`}>
          <Bag variant={BAG_VARIANTS.GRADIENT} size={domains.length} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
