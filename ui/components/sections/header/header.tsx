import { Logo } from "@/components/atoms/logo";
import { ConnectWalletButton } from "@/components/molecules/connectWalletButton";

import style from "./header.styles.module.css";
import { Bag } from "@/components/atoms/bag";
import { BAG_VARIANTS } from "@/components/atoms/bag/bag.type";

const Header = (): JSX.Element => {
  return (
    <header className={style.header}>
      <Logo />
      <div className={style.rightSide}>
        <ConnectWalletButton />
        <Bag variant={BAG_VARIANTS.GRADIENT} />
      </div>
    </header>
  );
};

export default Header;
