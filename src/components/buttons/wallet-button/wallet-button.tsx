import { ButtonHTMLAttributes, FC } from 'react';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';


export const WalletButton = () => {

    const connect = async () => {
        if (!window.ethereum) return;
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        console.log(account);

        const client = createWalletClient({
            account,
            chain: mainnet,
            transport: custom(window.ethereum),
        });
        // todo: set wallet client in global store
    };

    return (
        <button onClick={connect}>

        </button>
    );
};
