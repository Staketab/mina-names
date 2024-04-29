"use client";

import { useStoreContext } from "@/store";
import PopupOverlay from "../popupOverlay";
import { modalVariants } from "./modals.variant";

import style from "./index.module.css";
import React, { useMemo } from "react";

const ModalContainer = (): JSX.Element => {
  const {
    state: { modals },
  } = useStoreContext();

  return (
    <>
      {modals.map((modal) => {
        const Component = modalVariants[modal.modal];

        const ModalComponent = typeof Component === "object" && (
          //@ts-ignore
          <Component {...modal.data} />
        );
        const modalChild =
          ModalComponent || (Component ? Component(modal.data) : null);

        return (
          <PopupOverlay
            position="center"
            animation="appear"
            show={true}
            key={modal.modal}
          >
            <div className={style.contentWrapper}>{modalChild}</div>
          </PopupOverlay>
        );
      })}
    </>
  );
};

export default React.memo(ModalContainer);
