"use client";
import React, { useEffect, useMemo, useState } from "react";
import WalletConnectPopUpHeader from "./header";
import style from "./WalletConnectPopUp.module.css";
import WalletList from "./screens/walletList";
import ConnectingScreen from "./screens/connectionScreen";
import InstallScreen from "./screens/installScreen";
import SuccessScreen from "./screens/successScreen";
import FailScreen from "./screens/failScreen";
import WalletConnectPopUpMobileHeader from "./mobileHeader";
import { useStoreContext } from "@/store";
import { Modals } from "../../modals/modals.types";
import getWalletConfig from "../hellper";
import { useKeyPress, useMedia } from "@/hooks";

const messages = {
  0: "Connecting your wallet is like “logging in” to Web3. Select your wallet from the options to get started.",
  1: "Please approve the connection in your wallet and authorize access to continue.",
  2: "Your wallet is now connected to Suiscan.",
};

const actions = {
  0: "Connect your wallet",
  1: "Approve Connection",
  2: "Connection successfull",
};

const statuses = {
  normal: "normal",
  notInstalled: "notInstalled",
  rejected: "rejected",
};

export type WalletConnectPopUpCoreProps = {
  connectMessage?: string;
  isMobileConnection?: boolean;
  onConnectWallet: () => Promise<undefined | string>;
  onResolve?: (value: string) => void;
};

const WalletConnectPopUpCore = ({
  connectMessage,
  isMobileConnection,
  onConnectWallet,
  onResolve,
}: WalletConnectPopUpCoreProps) => {
  const [step, setStep] = useState(0);
  const [stepStatus, setStepStatus] = useState(statuses.normal);
  const [connectingWalletName, setConnectingWalletName] =
    useState<string>(null);
  const {
    state: {
      walletData: { accountId },
    },
    actions: { closeModal },
  } = useStoreContext();

  const walletName = accountId ? "Auro Wallet" : null;
  const list = getWalletConfig();
  const rejected = connectMessage === "user reject";

  const media = useMedia();
  const isMobile = !media.greater.xs;
  useKeyPress("Escape", () => {
    closeModal(Modals.walletConnect);
  });

  const findWalletByName = (name) => list.find((el) => el.name === name);
  const currentWallet = findWalletByName(connectingWalletName);

  const [installed] = useMemo(() => {
    if (list?.length < 1) return [[], []];
    return [
      list.filter((el) => el.installed),
      list.filter((el) => !el.installed),
    ];
  }, [list]);

  const cardClickHandler = async (
    name: string,
    installed: boolean
  ): Promise<void> => {
    setConnectingWalletName(name);
    if (installed) {
      setStepStatus(statuses.normal);
      const accoutnId = await onConnectWallet();
      onResolve && accoutnId && onResolve(accoutnId);
    } else setStepStatus(statuses.notInstalled);
    setStep(1);
  };

  const onReturn = (): void => {
    setStep(0);
    setStepStatus(statuses.normal);
  };

  useEffect(() => {
    if (rejected && !accountId) {
      setStepStatus(statuses.rejected);
      setStep(1);
    } else if (accountId && walletName && walletName === connectingWalletName) {
      setStepStatus(statuses.normal);
      setStep(2);
    } else if (accountId && !walletName) {
      setStepStatus(statuses.normal);
      setStep(2);
    }
  }, [accountId, rejected, walletName, connectingWalletName]);

  const renderComponentBySteps = (step): JSX.Element => {
    switch (step) {
      case 0:
        return (
          <WalletList
            list={list}
            cardClickHandler={cardClickHandler}
            isMobile={isMobile}
            isMobileConnection={isMobileConnection}
          />
        );
      case 1:
        // eslint-disable-next-line no-case-declarations
        const commanProps = {
          walletName: connectingWalletName,
          walletImg: currentWallet?.icon,
          onReturn,
        };
        if (stepStatus === statuses.normal) {
          return <ConnectingScreen {...commanProps} />;
        }
        if (stepStatus === statuses.notInstalled) {
          return (
            <InstallScreen
              walletName={connectingWalletName}
              downloadUrl={currentWallet?.downloadUrl?.browserExtension}
              downloadUrlMobile={currentWallet?.downloadUrl?.mobileApp}
              isMobileConnection={isMobileConnection}
              {...commanProps}
            />
          );
        }
        if (stepStatus === statuses.rejected) {
          return (
            <FailScreen
              installed={currentWallet?.installed}
              onRetry={cardClickHandler}
              {...commanProps}
            />
          );
        }
        break;
      case 2:
        if (stepStatus === statuses.normal) {
          return (
            <SuccessScreen
              walletName={connectingWalletName}
              onClose={() => {
                closeModal(Modals.walletConnect);
              }}
            />
          );
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.walletConnectPopUp}>
      <WalletConnectPopUpHeader
        step={step}
        onClose={() => {
          closeModal(Modals.walletConnect);
        }}
        message={messages[step]}
        action={actions[step]}
        isMobile={isMobile}
      />
      <div className={style.screen}>{renderComponentBySteps(step)}</div>
      {isMobile && (
        <WalletConnectPopUpMobileHeader
          onClose={() => closeModal(Modals.walletConnect)}
          message={step === 0 && `${installed.length} avaliable wallets`}
          action={actions[step]}
        />
      )}
    </div>
  );
};
export default WalletConnectPopUpCore;
