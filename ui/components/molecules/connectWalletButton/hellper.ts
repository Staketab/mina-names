import { WalletService } from "@/services/walletService";
import auroIcon from "./img/auro.png";
import { StaticImageData } from "next/image";

const getWalletConfig = (): {
  installed: boolean;
  name: string;
  icon: StaticImageData;
  downloadUrl: {
    browserExtension: string;
    mobileApp?: string;
  };
}[] => [
  {
    // eslint-disable-next-line valid-typeof
    installed: WalletService.minaAdapter?.isAuro,
    name: "Auro Wallet",
    icon: auroIcon,
    downloadUrl: {
      browserExtension:
        "https://chrome.google.com/webstore/detail/auro-wallet/cnmamaachppnkjgnildpdmkaakejnhae",
    },
  },
];

export default getWalletConfig;
