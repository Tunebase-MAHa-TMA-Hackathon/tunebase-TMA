import { FC, PropsWithChildren } from 'react';
import { http } from 'viem';
import { polygonAmoy } from 'viem/chains';
import { createConfig, WagmiProvider as WGMIProvider } from 'wagmi';

const config = createConfig({
    chains: [polygonAmoy],
    transports: {
        [polygonAmoy.id]: http(),
    },
});

export const WagmiProvider: FC<PropsWithChildren> = ({ children }) => (
    <WGMIProvider config={config}>{children}</WGMIProvider>
);
