import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletClient } from 'viem';

interface UserState {
    walletClient: WalletClient | null;
}

const initialState: UserState = {
    walletClient: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setWalletClient: (state: UserState, action: PayloadAction<UserState['walletClient']>) => {
            state.walletClient = action.payload;
            localStorage.setItem('walletClient', JSON.stringify(state.walletClient));
        },
    }
})

export const { setWalletClient } = userSlice.actions;
export default userSlice.reducer;
