import { WalletService } from "./walletService";

class InitServiceClass {
  private isInit = false;
  async init(): Promise<void> {

    if (!this.isInit) {
      WalletService.initWalletService();
      this.isInit = true;
    } else {
      throw new Error("App already init");
    }
  }
}

const InitService = new InitServiceClass();

export { InitService };
