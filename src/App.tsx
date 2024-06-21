import React from 'react';

import { BiconomyProvider } from '@/providers/BiconomyProvider.tsx';
import { ReduxProvider } from '@/providers/ReduxProvider.tsx';
import { RouterProvider } from '@/providers/RouterProvider.tsx';
import { TanstackQueryProvider } from '@/providers/TanstackQueryProvider.tsx';
import { WagmiProvider } from '@/providers/WagmiProvider.tsx';

import '@twa-dev/sdk';

import './index.css';

function App() {
  return (
    <WagmiProvider>
            <TanstackQueryProvider>
                <BiconomyProvider>
                    <React.StrictMode>
                        <ReduxProvider>
                            <RouterProvider />
                        </ReduxProvider>
                    </React.StrictMode>
                </BiconomyProvider>
            </TanstackQueryProvider>
        </WagmiProvider>
    );
}

export default App;
