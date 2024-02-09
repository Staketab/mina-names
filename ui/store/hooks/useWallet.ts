import { PayloadAction } from "@reduxjs/toolkit";

import * as WalletStore from "../wallet/walletSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
export type SendPaymentresponse = {
  hash?: string;
  message?: string;
  code?: number;
};

export type OnSend = (
  amount: number,
  to: string,
  fee: number,
  memo: string
) => Promise<SendPaymentresponse>;

export const isConnectedAuro = "isConnectedAuro";

interface IUseGlobal extends WalletStore.IWalletData {
  actions: {
    setWalletData: (
      payload: WalletStore.IWalletData
    ) => PayloadAction<WalletStore.IWalletData>;
    onConnectWallet: () => Promise<void>;
    onDisconnectWallet: () => Promise<void>;
    setConnectMessage: (value: string | null) => void;
  };
}

export default function useWallet(): IUseGlobal {
    const [account, setAccount] = useLocalStorage('account');

  const [walletData, setWalletData] = useState(null);
  const [, setIsConnectedAuro] = useLocalStorage(isConnectedAuro);
console.log(account);
console.log(walletData);
useEffect(() => {
    !!account && setWalletData(JSON.parse(account))
}, [])

  const setConnectMessage = (connectMessage) =>
    setWalletData({ ...walletData, connectMessage: connectMessage });

  const minaAdapter = typeof window !== "undefined" && window["mina"];

  const onConnectWallet = async (): Promise<void> => {
    if (!minaAdapter) {
      console.warn("No provider was found Auro Wallet");
    } else {
      setWalletData({
        ...walletData,
        connectMessage: "Onboarding in progress",
      });

      const data = await minaAdapter.requestAccounts().catch((err) => err);
      if (data.message) {
        setWalletData({ ...walletData, connectMessage: data.message });
      } else {
        setWalletData({
          ...walletData,
          accountId: data,
          connectMessage: "Connected",
        });
        setIsConnectedAuro(true);
        setAccount(JSON.stringify({
          ...walletData,
          accountId: data,
          connectMessage: "Connected",
        }));
      }
    }
  };

  const onDisconnectWallet = async (): Promise<void> => {
    setWalletData(null);
    setIsConnectedAuro(false);
    setAccount(null)
  };
  return {
    ...walletData,
    actions: {
      setWalletData,
      onConnectWallet,
      onDisconnectWallet,
      setConnectMessage,
    },
  };
}
