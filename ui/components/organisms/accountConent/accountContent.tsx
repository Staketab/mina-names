import { ConnectWalletButton } from "../../molecules/connectWalletButton";
import style from "./index.module.css";

const AccountContent = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className="t-inter-semi-bold">My Names</div>
        <ConnectWalletButton />
      </div>
      <div></div>
    </div>
  );
};

export default AccountContent;
