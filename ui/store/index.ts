import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { walletService } from "./wallet/walletService";

import walletReducer from "./wallet/walletSlice";

export const rootReducer = combineReducers({
  wallet: walletReducer,
  [walletService.reducerPath]: walletService.reducer,
});

export const createStore = (_initialValue = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: { ..._initialValue },
    //@ts-ignore
    middleware: (getDefaultMiddleware) => {
      const middlewares = [walletService.middleware];
      return getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
        immutableCheck: false,
      }).concat(middlewares);
    },
    devTools: true,
  });

  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
