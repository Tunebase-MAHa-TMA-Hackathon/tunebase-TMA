import { combineReducers } from '@reduxjs/toolkit';

import balanceReducer from './slices/balance.ts';
import listenReducer from './slices/listen';
import modalsReducer from './slices/modals.ts';
import userReducer from './slices/user.ts';

const rootReducer = combineReducers({
    listen: listenReducer,
    modal: modalsReducer,
    balance: balanceReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
