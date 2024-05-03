import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import useAddressBalance, { Balance } from "./useAddressBalance";

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

type sendResultMessage = {
  hash: string;
  message?: string;
  result: boolean;
};

interface IUseGlobal {
  accountId;
  balance: Balance;
  connectMessage;
  sendResultMessage: sendResultMessage;
  actions: {
    setWalletData: (payload: any) => any;
    onConnectWallet: () => Promise<void>;
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

enum ChainId {
  devnet = "devnet",
  berkeley = "berkeley",
  mainnet = "mainnet",
}

type ChainInfoArgs = {
  chainId: ChainId;
  name: "Devnet" | "Berkeley" | "Mainnet";
};

interface ProviderError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export default function useWallet(): IUseGlobal {
  const [account, setAccount] = useLocalStorage("account");

  const [walletData, setWalletData] = useState(null);
  const [, setIsConnectedAuro] = useLocalStorage(isConnectedAuro);
  const [sendResultMessage, setSendResultMessage] =
    useState<sendResultMessage>();

  useEffect(() => {
    !!account && setWalletData(JSON.parse(account));
  }, []);

  const balance = useAddressBalance(walletData?.accountId?.[0]);

  const setConnectMessage = (connectMessage) =>
    setWalletData({ ...walletData, connectMessage: connectMessage });

  const minaAdapter = typeof window !== "undefined" && window["mina"];

  const requestNetwork = async () => {
    const network: ChainInfoArgs | ProviderError = await minaAdapter
      ?.requestNetwork()
      .catch((err: any) => err);

    // if ("chainId" in network && network.chainId !== ChainId.devnet) {
    //   const switchResult: ChainInfoArgs | ProviderError = await minaAdapter
    //     ?.switchChain({
    //       chainId: ChainId.devnet,
    //     })
    //     .catch((err: any) => err);
    //   console.log(switchResult);
    // }
  };

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
        setAccount(
          JSON.stringify({
            ...walletData,
            accountId: data,
            connectMessage: "Connected",
          })
        );
      }
    }
  };

  const onDisconnectWallet = async (): Promise<void> => {
    setWalletData(null);
    setIsConnectedAuro(false);
    setAccount(null);
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

  useEffect(() => {
    requestNetwork();
  }, []);

  return {
    ...walletData,
    balance,
    sendResultMessage,
    actions: {
      setWalletData,
      onConnectWallet,
      onDisconnectWallet,
      setConnectMessage,
      onSendClick,
    },
  };
}
