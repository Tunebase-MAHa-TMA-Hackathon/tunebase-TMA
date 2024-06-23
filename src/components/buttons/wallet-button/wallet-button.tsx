import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BiconomySmartAccountV2, createSmartAccountClient } from '@biconomy/account';
import { createWalletClient, custom, WalletClient } from 'viem';
import { goerli } from 'viem/chains';

import Dropdown from '@/components/dropdown/dropdown.tsx';
import { useTypedDispatch } from '@/store';
import { RootState } from '@/store/reducer.ts';
import { setSmartAccount, setWalletClient } from '@/store/slices/user.ts';
import { truncateString } from '@/utils/string.ts';

const chainId = import.meta.env.VITE_BICONOMY_CHAIN_ID;
const biconomyPaymasterApiKey = import.meta.env.VITE_BICONOMY_PAYMASTER_API_KEY;
const bundlerUrl = import.meta.env.VITE_BICONOMY_BUNDLER_URL.replace('CHAIN_ID', chainId);

export const WalletButton = () => {

    const dispatch = useTypedDispatch();
    const walletClient: WalletClient | null = useSelector((state: RootState) => state.user.walletClient);
    const smartAccount: BiconomySmartAccountV2 | null = useSelector((state: RootState) => state.user.smartAccount);

    const accountAddress = walletClient?.account?.address;
    const accountAddressTruncated = accountAddress ? truncateString(accountAddress, 12) : 'No address';

    const connect = async () => {
        if (!window.ethereum) return;

        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const WC = createWalletClient({
                    account,
                    chain: goerli,
                    transport: custom(window.ethereum),
                })

        dispatch(setWalletClient(WC));
    };

    const upgrade = async () => {
        if (smartAccount !== null) return;

        if (walletClient === null) {
            alert('You should login!');
            return;
        }

        // creating smart account
        const SA = await createSmartAccountClient({
            signer: walletClient,
            biconomyPaymasterApiKey,
            bundlerUrl,
        });

        console.log(SA)
        dispatch(setSmartAccount(SA));
    };

    const disconnect = async () => {
        if (!window.ethereum) return;
        if (smartAccount !== null) dispatch(setSmartAccount(null));
        dispatch(setWalletClient(null));
    };

    const Button: FC<{ text: string, onClick?: () => void; }> = ({ text, onClick }) => (
        <button onClick={onClick}
                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-button text-button-foreground hover:bg-button/90 h-10 px-4 py-2">
            {text}
        </button>
    );

    if (walletClient === null) return <Button text="Connect" onClick={connect} />;

    console.log('smartAccount: ', smartAccount)
    return (
        <Dropdown
            button={<Button text={accountAddressTruncated} />}
            children={
                <div
                    className="flex h-max w-28 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[25px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">

                    <div className="mt-3 ml-2">
                        <button onClick={upgrade}
                                className="text-base font-semibold text-gray-800 dark:text-white hover:dark:text-white">
                            Upgrade&nbsp;🚀
                        </button>
                    </div>
                    <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
                    <div className="mt-3 ml-2">
                        <button onClick={disconnect}
                                className="text-base font-semibold text-gray-800 dark:text-white hover:dark:text-white">
                            Logout&nbsp;🚪
                        </button>
                    </div>

                </div>
            }
            classNames={'py-2 top-[36px] left-[25px] !origin-top-left w-max left-1'}
        />
    );
};
