"use client";

import { useStoreContext } from "@/store";
import PopupOverlay from "../popupOverlay";
import { modalVariants } from "./modals.variant";

import style from "./index.module.css";
import React from "react";

const ModalContainer = (): JSX.Element => {
  const {
    state: { modals },
    actions: { closeModal },
  } = useStoreContext();

  return (
    <>
      {modals.map((modal) => {
        const Component = modalVariants[modal.modal];
        console.log(modal.data);

        const ModalComponent = typeof Component === "object" && (
          //@ts-ignore
          <Component {...modal.data} onClose={onClose} />
        );
        // @ts-ignore
        const data = { ...modal.data, onClose: closeModal };
        const modalChild =
          ModalComponent || (Component ? Component(data) : null);

        return (
          <PopupOverlay
            position="center"
            animation="appear"
            show={true}
            key={modal.modal}
            onClose={closeModal}
          >
            <div className={style.contentWrapper}>{modalChild}</div>
          </PopupOverlay>
        );
      })}
    </>
  );
};

export default React.memo(ModalContainer);
