import { FC, PropsWithChildren } from 'react';
import { BiconomyProvider as BCNMYProvider } from "@biconomy/use-aa";

import { queryClient } from '@/providers/TanstackQueryProvider.tsx';


const chainId = import.meta.env.VITE_BICONOMY_CHAIN_ID;
const biconomyPaymasterApiKey = import.meta.env.VITE_BICONOMY_PAYMASTER_API_KEY;
const bundlerUrl = import.meta.env.VITE_BICONOMY_BUNDLER_URL.replace('CHAIN_ID', chainId);

export const BiconomyProvider: FC<PropsWithChildren> = ({ children }) => (
    <BCNMYProvider
        config={{
            biconomyPaymasterApiKey,
            bundlerUrl,
        }}
        queryClient={queryClient}
    >
        {children}
    </BCNMYProvider>
);
