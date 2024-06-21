import { useEffect, useState } from "react";
import { WalletData, initWalletData, useStoreContext } from "@/store";
import { NetworkID } from "@/comman/types";
import { Balance, WalletService } from "@/services/walletService";

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

type sendResultMessage = {
  hash: string;
  message?: string;
  result: boolean;
};

export enum ChainId {
  devnet = "devnet",
  berkeley = "berkeley",
  mainnet = "mainnet",
}

export type ChainInfoArgs = {
  networkID: NetworkID;
};

export interface ProviderError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface IUseWallet {
  sendResultMessage: sendResultMessage;
  actions: {
    onConnectWallet: () => Promise<undefined | string>;
    onDisconnectWallet: () => Promise<void>;
    setConnectMessage: (value: string | null) => void;
    onSendClick: ({
      amount,
      to,
      fee,
      meme,
    }: {
      amount: number;
      to: string;
      fee: number;
      meme?: string;
    }) => Promise<
      | {
          hash: string;
        }
      | undefined
    >;
  };
}
function useWallet(): IUseWallet {
  const {
    state: { walletData },
    actions: { setWalletData: setWalletDataToStore },
  } = useStoreContext();

  const [sendResultMessage, setSendResultMessage] =
    useState<sendResultMessage>();

  const setConnectMessage = (connectMessage) =>
    setWalletDataToStore({ ...walletData, connectMessage: connectMessage });

  const onConnectWallet = async (): Promise<undefined | string> => {
    if (!WalletService.minaAdapter) {
      console.warn("No provider was found Auro Wallet");
    } else {
      const data = await WalletService.requestAccounts();
      const network = await WalletService.getNetwork();

      if ("message" in data && data.message) {
        setWalletDataToStore({
          ...walletData,
          connectMessage: data.message,
          network: network as ChainInfoArgs,
        });
      } else {
        if ("networkID" in network) {
          const balance: Balance = await WalletService.getBalance(
            data?.[0],
            network.networkID as NetworkID
          );
          const newWalletData = {
            accountId: data?.[0] || "",
            network,
            connectMessage: "Connected",
            balance,
          } as WalletData;

          setWalletDataToStore(newWalletData);
        }
        return data?.[0];
      }
    }
  };

  const onDisconnectWallet = async (): Promise<void> => {
    WalletService.onDisconnectWallet()
  };

  const onSendClick = async ({ amount, to, fee, memo }) => {
    try {
      let sendResult = await WalletService.sendPayment({
        amount,
        to,
        fee,
        memo,
      });
      setSendResultMessage({
        hash: sendResult?.hash,
        message: sendResult?.message,
        result: !!sendResult?.hash,
      });
      return sendResult;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sendResultMessage,
    actions: {
      onConnectWallet,
      onDisconnectWallet,
      setConnectMessage,
      onSendClick,
    },
  };
}

export { useWallet };
