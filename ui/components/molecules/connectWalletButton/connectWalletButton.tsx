"use client";
import classNames from "classnames";
import style from "./index.module.css";
import ButtonWithAddress from "./buttonWithAddress";
import ConnectButton from "./connectButton";
import { useStoreContext } from "@/store";
import { Modals } from "../modals/modals.types";
import { useWallet } from "@/hooks";

const ConnectWalletButton = () => {
  const {
    actions: { onConnectWallet, onDisconnectWallet },
  } = useWallet();
  const {
    state: {
      walletData: { accountId, connectMessage },
    },
    actions: { openModal },
  } = useStoreContext();

  const handleConnect = () => {
    openModal(Modals.walletConnect, {
      connectMessage,
      onConnectWallet,
    });
  };

  return (
    <div className={classNames(style.plate, { [style.connect]: !accountId })}>
      {accountId ? (
        <ButtonWithAddress
          address={accountId}
          onDisconnect={async () => {
            await onDisconnectWallet();
          }}
        />
      ) : (
        <ConnectButton onClick={handleConnect} />
      )}
    </div>
  );
};

export default ConnectWalletButton;
