import { BiconomySmartAccountV2 } from '@biconomy/account';
import { createSlice } from '@reduxjs/toolkit';
import { WalletClient } from 'viem';

interface UserState {
    walletClient: WalletClient | null;
    smartAccount: BiconomySmartAccountV2 | null;
}

const initialState: UserState = {
    walletClient: null,
    smartAccount: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setWalletClient: (state, {payload}) => {
            state.walletClient = payload;
            localStorage.setItem('walletClient', JSON.stringify(state.walletClient));
        },
        setSmartAccount: (state, {payload}) => {
            state.smartAccount = payload;
            localStorage.setItem('smartAccount', JSON.stringify(state.smartAccount));
        },
    }
});

export const { setWalletClient, setSmartAccount } = userSlice.actions;
export default userSlice.reducer;
