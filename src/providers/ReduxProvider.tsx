import { FC, PropsWithChildren } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import { makeStore } from '@/store';

const store = makeStore();

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => (
    <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
);
