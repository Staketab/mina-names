"use client";
import { Modals } from "@/components/molecules/modals/modals.types";
import React, { useContext, useReducer } from "react";

export type OPEN_MODAL = {
  type: "OPEN_MODAL";
  payload: { modal: Modals; data?: unknown };
};
export type CLOSE_MODAL = { type: "CLOSE_MODAL"; payload: Modals };

type StoreActions = OPEN_MODAL | CLOSE_MODAL;

type OpenModal = (modal: Modals, data?: unknown) => void;
type CloseModal = (modal?: Modals) => void;

type IStore = {
  state: IState;
  actions: {
    openModal: OpenModal;
    closeModal: CloseModal;
  };
};

export interface IState {
  modals: {
    modal: Modals;
    data?: unknown;
  }[];
}

export const initialState: IState = {
  modals: [],
};

export const reducer = (state: IState, action: StoreActions): IState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        modals: [...state.modals, action.payload],
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modals: state.modals.filter((modal, index) => {
          console.log("store", modal);
          console.log(state.modals);

          if (!action.payload) {
            return state.modals.length - 1 !== index;
          }
          return modal.modal !== action.payload;
        }),
      };

    default:
      return state;
  }
};

const noop = () => undefined;

export const StoreContext: React.Context<IStore> = React.createContext({
  state: initialState,
  actions: {
    openModal: noop,
    closeModal: noop,
  },
});

const Store = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = (modal: Modals, data: unknown) =>
    dispatch({ type: "OPEN_MODAL", payload: { modal, data } });

  const closeModal = (modal: Modals) =>
    dispatch({ type: "CLOSE_MODAL", payload: modal });

  return (
    <StoreContext.Provider
      value={{
        state,
        actions: {
          openModal,
          closeModal,
        },
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};

export default Store;
