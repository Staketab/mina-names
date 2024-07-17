import { FC } from "react";
import { Modals } from "./modals.types";
import {
  ModalPurchase,
  ModalInfo,
  ConfirmationModal,
  UploadModal,
  TransactionAppliedModal,
  TransactionFailedModal,
  PendingModal
} from ".";
import WalletConnectPopUpCore from "../connectWalletButton/walletConnectPopUp/core";

export const modalVariants: Record<string, FC<any>> = {
  [Modals.transactionApplied]: TransactionAppliedModal,
  [Modals.transactionFailed]: TransactionFailedModal,
  [Modals.purchase]: ModalPurchase,
  [Modals.info]: ModalInfo,
  [Modals.confirmation]: ConfirmationModal,
  [Modals.upload]: UploadModal,
  [Modals.walletConnect]: WalletConnectPopUpCore,
  [Modals.pending]: PendingModal,
};
