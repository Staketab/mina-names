import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getWalletBalance } from './walletService';


export type IWalletData = {
    accountId: string[];
    connectMessage: string;
    balance: { balance: number; balanceUsd: number };
};

const initialState: IWalletData = {
    balance: { balance: 0, balanceUsd: 0 },
    connectMessage: '',
    accountId: ['']
};

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWalletData: (_, action: PayloadAction<IWalletData>) => {
            return {
                ...action.payload,
            };
        },
    },
    // @ts-ignore
    extraReducers: (builder) => {
        builder.addMatcher(getWalletBalance.matchFulfilled, (state, { payload }) => {
            state.balance = payload;
        });
    },
});

export const { setWalletData } = walletSlice.actions;
export default walletSlice.reducer;
