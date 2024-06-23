import { FC } from 'react';
import { useSelector } from 'react-redux';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

import Dropdown from '@/components/dropdown/dropdown.tsx';
import { useTypedDispatch } from '@/store';
import { RootState } from '@/store/reducer.ts';
import { setWalletClient } from '@/store/slices/user.ts';
import { truncateString } from '@/utils/string.ts';


export const WalletButton = () => {

    const dispatch = useTypedDispatch();
    const walletClient = useSelector((state: RootState) => state.user.walletClient);

    const accountAddress = walletClient?.account?.address;
    const accountAddressTruncated = accountAddress ? truncateString(accountAddress, 12) : 'No address';

    const connect = async () => {
        if (!window.ethereum) return;
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        dispatch(
            setWalletClient(
                createWalletClient({
                    account,
                    chain: mainnet,
                    transport: custom(window.ethereum),
                })
            )
        );
    };

    const disconnect = async () => {
        if (!window.ethereum) return;
        dispatch(setWalletClient(null));
    };

    const Button: FC<{ text: string, onClick?: () => void; }> = ({ text, onClick }) => (
        <button onClick={onClick}
                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-button text-button-foreground hover:bg-button/90 h-10 px-4 py-2">
            {text}
        </button>
    );

    if (walletClient === null) return <Button text="Connect" onClick={connect} />;

    return (
        <Dropdown
            button={<Button text={accountAddressTruncated} />}
            children={
                <div
                    className="flex h-max w-24 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[25px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">

                    <div className="mt-3 ml-2">
                        <button onClick={disconnect}
                                className="text-base font-semibold text-gray-800 dark:text-white hover:dark:text-white">
                            Logout&nbsp;🚪
                        </button>
                    </div>

                </div>
            }
            classNames={'py-2 top-[36px] left-[25px] !origin-top-left w-max'}
        />
    );
};
