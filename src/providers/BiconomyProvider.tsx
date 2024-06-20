import { FC, PropsWithChildren } from 'react';
import { BiconomyProvider as BCNMYProvider } from "@biconomy/use-aa";

import { queryClient } from '@/providers/TanstackQueryProvider.tsx';


const biconomyPaymasterApiKey =
    process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "";
const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";

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
