import { chain } from "@/comman/constants";
import { NetworkID } from "@/comman/types";
import { ChainInfoArgs, ProviderError } from "@/hooks";
import { initWalletData } from "@/store";

const Networks = {
  [NetworkID.devnet]: "devnet",
  [NetworkID.berkeley]: "qanet",
  [NetworkID.mainnet]: "mainnet",
};

export type Balance = {
  balance: number;
  balanceUsd: number;
};

class WalletServiceClass {
  minaAdapter = null;
  accountId = null;
  networkID = null;
  balance: Balance = {
    balance: 0,
    balanceUsd: 0,
  };
  setAccount = null;

  set setAccountDataToStore(action) {
    this.setAccount = action;
  }

  async getNetwork(): Promise<ChainInfoArgs | ProviderError> {
    const network: ChainInfoArgs | ProviderError = await this.minaAdapter
      ?.requestNetwork()
      .catch((err: any) => err);

    if (network && "networkID" in network) {
      this.networkID = network.networkID;
    }

    return network;
  }

  async getAccounts(): Promise<string[]> {
    const accounts = await this.minaAdapter?.getAccounts();

    this.accountId = accounts?.[0];
    return accounts;
  }

  async requestAccounts(): Promise<string[] | { message: string }> {
    const accounts = await this.minaAdapter
      .requestAccounts()
      .catch((err) => err);

    this.accountId = accounts?.[0];

    return accounts;
  }

  async sendPayment({ amount, to, fee, memo }): Promise<{
    hash: string;
    message: "string";
  }> {
    try {
      return this.minaAdapter
        .sendPayment({
          amount,
          to,
          fee,
          memo,
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async onDisconnectWallet (): Promise<void> {
    this.setAccount(initWalletData);
  };

  async switchChain(networkID?: NetworkID): Promise<ChainInfoArgs> {
    return this.minaAdapter
      .switchChain({
        networkID: networkID || NetworkID.devnet,
      })
      .catch((err: any) => err);
  }

  async signFields(signatureData): Promise<{ signature: string }> {
    return await this.minaAdapter?.signFields({
      message: signatureData,
    });
  }

  async getBalance(address: string, networkID: NetworkID): Promise<Balance> {
    try {
      return fetch(
        `https://minascan.io/${chain}/api/api/core/accounts/${address}/balance`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          this.balance = data;
          return data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async isWalletConnected(): Promise<boolean> {
    const accounts = await this?.getAccounts();
    return !!accounts[0];
  }

  listenerAccountsChanged(): void {
    this.minaAdapter?.on("accountsChanged", async (accounts: string[]) => {
      console.log("accounts changed to:", accounts);
      this.accountId = accounts[0];
      const balance = await this.getBalance(accounts[0], this.networkID);
      this.setAccount({
        accountId: accounts[0],
        connectMessage: "",
        network: { networkID: this.networkID },
        balance: balance,
      });
    });
  }

  listenerChainChanged(): void {
    this.minaAdapter?.on("chainChanged", async (chainInfo: ChainInfoArgs) => {
      console.log("chain changed to:", chainInfo);
      this.networkID = chainInfo.networkID;
      const balance = await this.getBalance(
        this.accountId,
        chainInfo.networkID
      );

      this.setAccount({
        accountId: this.accountId,
        connectMessage: "",
        network: chainInfo,
        balance: balance,
      });
    });
  }

  initWalletService(): void {
    if (typeof window === "undefined" || !window["mina"]) return;
    this.minaAdapter = window["mina"];
    
    this.listenerAccountsChanged();
    this.listenerChainChanged();
    this.isWalletConnected().then((isWalletConnected) => {
      if (!isWalletConnected) {
        localStorage.setItem("account", "");
      } else {
        this.getNetwork().then(() => {
          this.getBalance(this.accountId, this.networkID);
        });
      }
    });
  }
}

const WalletService = new WalletServiceClass();

export { WalletService };
