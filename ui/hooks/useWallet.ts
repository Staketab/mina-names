import { useState } from "react";
import useAddressBalance, { Balance } from "./useAddressBalance";
import { WalletData, initWalletData, useStoreContext } from "@/store";

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
  chainId: ChainId;
  name: "Devnet" | "Berkeley" | "Mainnet";
};

interface ProviderError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface IUseWallet {
  balance: Balance;
  sendResultMessage: sendResultMessage;
  actions: {
    onConnectWallet: () => Promise<undefined | string>;
    onDisconnectWallet: () => Promise<void>;
    setConnectMessage: (value: string | null) => void;
    getNetwork: () => Promise<ChainInfoArgs | ProviderError>;
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

  const balance = useAddressBalance(walletData?.accountId);

  const setConnectMessage = (connectMessage) =>
    setWalletDataToStore({ ...walletData, connectMessage: connectMessage });

  const minaAdapter = typeof window !== "undefined" && window["mina"];

  const getNetwork = async (): Promise<ChainInfoArgs | ProviderError> => {
    const network: ChainInfoArgs | ProviderError = await minaAdapter
      ?.requestNetwork()
      .catch((err: any) => err);

    return network;
  };

  const onConnectWallet = async (): Promise<undefined | string> => {
    if (!minaAdapter) {
      console.warn("No provider was found Auro Wallet");
    } else {
      // setWalletDataToStore({
      //   ...walletData,
      //   connectMessage: "Onboarding in progress",
      // });

      const data = await minaAdapter.requestAccounts().catch((err) => err);
      const network = await getNetwork();

      if (data.message) {
        setWalletDataToStore({
          ...walletData,
          connectMessage: data.message,
          network: network as ChainInfoArgs,
        });
      } else {
        const newWalletData = {
          accountId: data?.[0] || "",
          network,
          connectMessage: "Connected",
        } as WalletData;

        setWalletDataToStore(newWalletData);
        return data?.[0];
      }
    }
  };

  const onDisconnectWallet = async (): Promise<void> => {
    setWalletDataToStore(initWalletData);
  };

  const onSendClick = async ({ amount, to, fee, memo }) => {
    try {
      let sendResult = await minaAdapter
        .sendPayment({
          amount,
          to,
          fee,
          memo,
        })
        .catch((err) => {
          console.log(err);
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
    balance,
    sendResultMessage,
    actions: {
      onConnectWallet,
      onDisconnectWallet,
      setConnectMessage,
      onSendClick,
      getNetwork,
    },
  };
}

export { useWallet };
