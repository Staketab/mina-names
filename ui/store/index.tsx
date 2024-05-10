"use client";
import { bag } from "@/comman/constants";
import { Modals } from "@/components/molecules/modals/modals.types";
import { ChainId, ChainInfoArgs } from "@/hooks/useWallet";
import React, { useContext, useReducer } from "react";

type Domain = {
  name: string;
  years: number;
  amount: string | number;
  id: string;
};
type Bag = {
  reservationTime: Date | number;
  domains: Domain[];
};

type WalletData = {
  accountId: string;
  connectMessage: string;
  network: ChainInfoArgs;
};
export type OPEN_MODAL = {
  type: "OPEN_MODAL";
  payload: { modal: Modals; data?: unknown };
};
export type CLOSE_MODAL = { type: "CLOSE_MODAL"; payload: Modals };

export type INIT_STOR_FROM_LOCAL_STORAGE = {
  type: "INIT_STOR_FROM_LOCAL_STORAGE";
  payload: IState;
};

export type ADD_TO_BAG = {
  type: "ADD_TO_BAG";
  payload: Domain;
};

export type DELETE_FROM_BAG = {
  type: "DELETE_FROM_BAG";
  payload: string;
};

export type ADD_PERIOD = {
  type: "ADD_PERIOD";
  payload: {
    id: string;
    value: number;
  };
};

export type CLEAR_BAG = {
  type: "CLEAR_BAG";
};

type StoreActions =
  | OPEN_MODAL
  | CLOSE_MODAL
  | ADD_TO_BAG
  | DELETE_FROM_BAG
  | ADD_PERIOD
  | INIT_STOR_FROM_LOCAL_STORAGE
  | CLEAR_BAG;

type initStore = (value: IState) => void;
type OpenModal = (modal: Modals, data?: unknown) => void;
type CloseModal = (modal?: Modals) => void;
type addToBag = (data: Domain) => void;
type deleteFromBag = (id: string) => void;
type addPeriod = (id: string, value: number) => void;
type clearBag = () => void;

type IStore = {
  state: IState;
  actions: {
    openModal: OpenModal;
    closeModal: CloseModal;
    addToBag: addToBag;
    deleteFromBag: deleteFromBag;
    addPeriod: addPeriod;
    initStore: initStore;
    clearBag: clearBag;
  };
};

export interface IState {
  modals: {
    modal: Modals;
    data?: unknown;
  }[];
  walletData?: WalletData;
  bag?: Bag;
}

export const initWalletData: WalletData = {
  accountId: "",
  connectMessage: "",
  network: {
    chainId: ChainId.devnet,
    name: "Devnet",
  },
};

export const initBag = {
  reservationTime: null,
  domains: [],
};

export const initialState: IState = {
  modals: [],
  walletData: initWalletData,
  bag: initBag,
};

export const reducer = (state: IState, action: StoreActions): IState => {
  switch (action.type) {
    case "INIT_STOR_FROM_LOCAL_STORAGE":
      return action.payload;
    case "OPEN_MODAL":
      return {
        ...state,
        modals: [...state.modals, action.payload],
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modals: state.modals.filter((modal, index) => {
          if (!action.payload) {
            return state.modals.length - 1 !== index;
          }
          return modal.modal !== action.payload;
        }),
      };
    case "ADD_TO_BAG":
      const dataBag = {
        reservationTime: Date.now(),
        domains: [...state.bag.domains, action.payload],
      };
      localStorage.setItem(bag, JSON.stringify(dataBag));
      return {
        ...state,
        bag: dataBag,
      };
    case "DELETE_FROM_BAG":
      const newBag = {
        ...state.bag,
        domains: state.bag.domains.filter(
          (domain) => domain.id !== action.payload
        ),
      };
      localStorage.setItem(bag, JSON.stringify(newBag));

      return {
        ...state,
        bag: newBag,
      };
    case "ADD_PERIOD":
      const editedBag = {
        ...state.bag,
        domains: state.bag.domains.map((domain) => {
          if (domain.id === action.payload.id) {
            return {
              ...domain,
              years: action.payload.value,
            };
          }
          return domain;
        }),
      };
      localStorage.setItem(bag, JSON.stringify(editedBag));

      return {
        ...state,
        bag: editedBag,
      };
    case "CLEAR_BAG":
      const clearedBag = {
        domains: [],
        reservationTime: null,
      };

      localStorage.setItem(bag, JSON.stringify(clearedBag));

      return {
        ...state,
        bag: clearedBag,
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
    addToBag: noop,
    deleteFromBag: noop,
    addPeriod: noop,
    initStore: noop,
    clearBag: noop,
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

  const addToBag = (domain: Domain) =>
    dispatch({ type: "ADD_TO_BAG", payload: domain });

  const deleteFromBag = (id: string) =>
    dispatch({ type: "DELETE_FROM_BAG", payload: id });

  const clearBag = () => dispatch({ type: "CLEAR_BAG" });

  const addPeriod = (id: string, value: number) =>
    dispatch({
      type: "ADD_PERIOD",
      payload: {
        id,
        value,
      },
    });

  const initStore = (value: IState) =>
    dispatch({ type: "INIT_STOR_FROM_LOCAL_STORAGE", payload: value });

  return (
    <StoreContext.Provider
      value={{
        state,
        actions: {
          openModal,
          closeModal,
          addToBag,
          deleteFromBag,
          addPeriod,
          initStore,
          clearBag,
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
