"use client";
import classNames from "classnames";

import style from "./index.module.css";
import ButtonWithAddress from "./buttonWithAddress";
import ConnectButton from "./connectButton";
import getWalletConfig from "./hellper";
import useWallet from "@/hooks/useWallet";
import { useStoreContext } from "@/store";
import { Modals } from "../modals/modals.types";

const ConnectWalletButton = () => {
  const {
    connectMessage,
    actions: { onConnectWallet, onDisconnectWallet },
  } = useWallet();
  const {
    state: {
      walletData: { accountId },
    },
    actions: { openModal },
  } = useStoreContext();

  const walletName = accountId ? "Auro Wallet" : null;

  const handleConnect = () => {
    openModal(Modals.walletConnect, {
      walletName: walletName,
      connected: !!accountId,
      rejected: connectMessage === "user reject",
      connectFunction: onConnectWallet,
      list: getWalletConfig(),
      keyID: "walletConnectPopUp",
      zIndex: 52,
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
