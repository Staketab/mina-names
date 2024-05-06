import { FC } from "react";
import { Modals } from "./modals.types";
import TransactionAppliedModal from "./transactionAppliedModal";
import TransactionFailedModal from "./transactionFailedModal";
import { ModalPurchase } from "./modalPurchase";
import { ModalInfo } from "./modalInfo";
import { ConfirmationModal } from "./confirmationModal";
import { UploadModal } from "./uploadModal";

export const modalVariants: Record<string, FC<any>> = {
  [Modals.transactionApplied]: TransactionAppliedModal,
  [Modals.transactionFailed]: TransactionFailedModal,
  [Modals.purchase]: ModalPurchase,
  [Modals.info]: ModalInfo,
  [Modals.confirmation]: ConfirmationModal,
  [Modals.upload]: UploadModal,
};
