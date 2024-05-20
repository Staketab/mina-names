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
  key?: string;
};

type BagByAccount = {
  reservationTime: Date | number;
  domains: Domain[];
};

type Bag = {
  [key: string]: BagByAccount;
};

export type WalletData = {
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
  payload: {
    id: string;
    key: string;
  };
};

export type ADD_PERIOD = {
  type: "ADD_PERIOD";
  payload: {
    id: string;
    value: number;
    key: string;
  };
};

export type CLEAR_BAG = {
  type: "CLEAR_BAG";
};

export type SET_WALLET_DATA = {
  type: "SET_WALLET_DATA";
  payload?: WalletData;
};

type StoreActions =
  | OPEN_MODAL
  | CLOSE_MODAL
  | ADD_TO_BAG
  | DELETE_FROM_BAG
  | ADD_PERIOD
  | INIT_STOR_FROM_LOCAL_STORAGE
  | CLEAR_BAG
  | SET_WALLET_DATA;

type initStore = (value: IState) => void;
type OpenModal = (modal: Modals, data?: unknown) => void;
type CloseModal = (modal?: Modals) => void;
type addToBag = (data: Domain) => void;
type addPeriod = (payload: { id: string; value: number; key: string }) => void;
type clearBag = () => void;
type setWalletData = (value?: WalletData) => void;
type deleteFromBag = (payload: { id: string; key: string }) => void;

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
    setWalletData: setWalletData;
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


export const initBag = {};

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
      const domains = state?.bag?.[action.payload.key]?.domains;

      const newDataBag = {
        [action.payload.key]: {
          reservationTime: Date.now(),
          domains: [...(domains? domains : []), action.payload]
        },
      };

      localStorage.setItem("bag", JSON.stringify(newDataBag));
      return {
        ...state,
        bag: newDataBag,
      };
    case "DELETE_FROM_BAG":
      const key = action.payload.key as string;

      const filteredBag = {
        ...state.bag,
        [key]: {
          reservationTime: state.bag?.[key]?.reservationTime,
          domains: state.bag[key].domains.filter(
            ({ id }) => id !== action.payload.id
          ),
        },
      };

      localStorage.setItem("bag", JSON.stringify(filteredBag));

      return {
        ...state,
        bag: filteredBag,
      };
    case "ADD_PERIOD":
      const editedBag = {
        ...state.bag,
        [action.payload.key]: {
          reservationTime: state.bag?.[action.payload.key].reservationTime,
          domains: state.bag?.[action.payload.key]?.domains?.map((domain) => {
            if (domain.id === action.payload.id) {
              return {
                ...domain,
                years: action.payload.value,
              };
            }
            return domain;
          }),
        },
      };

      localStorage.setItem("bag", JSON.stringify(editedBag));

      return {
        ...state,
        bag: editedBag,
      };
    case "CLEAR_BAG":
      localStorage.setItem(bag, JSON.stringify(initBag));

      return {
        ...state,
        bag: null,
      };
    case "SET_WALLET_DATA":
      localStorage.setItem("account", JSON.stringify(action.payload));

      return {
        ...state,
        walletData: {
          ...action.payload,
        },
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
    setWalletData: noop,
    newAddToBag: noop,
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

  const clearBag = () => dispatch({ type: "CLEAR_BAG" });

  const addPeriod = (payload) =>
    dispatch({
      type: "ADD_PERIOD",
      payload: payload,
    });

  const initStore = (value: IState) =>
    dispatch({ type: "INIT_STOR_FROM_LOCAL_STORAGE", payload: value });

  const setWalletData = (value?: WalletData) =>
    dispatch({ type: "SET_WALLET_DATA", payload: value });

  const deleteFromBag = (payload) =>
    dispatch({ type: "DELETE_FROM_BAG", payload: payload });

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
          setWalletData,
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
