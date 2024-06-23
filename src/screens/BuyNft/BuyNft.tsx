import { useSelector } from 'react-redux';
import { createSmartAccountClient } from '@biconomy/account';
import { encodeFunctionData, Hex } from 'viem';

import nftItem from '@/assets/img/nfts/NFT-1.jpeg?url';
import NFTCard from '@/components/cards/nft-card';
import { RootState } from '@/store/reducer.ts';

import { ABI } from '../../../abi.ts';
// TODO: Replace with BICO Stack
/* import { mintNewNft } from '@/hooks/useNftContract';
import { useTonClient } from '@/hooks/useTonClient';
import { useTonConnect } from '@/hooks/useTonConnect'; */

const chainId = import.meta.env.VITE_BICONOMY_CHAIN_ID;
const biconomyPaymasterApiKey = import.meta.env.VITE_BICONOMY_PAYMASTER_API_KEY;
const bundlerUrl = import.meta.env.VITE_BICONOMY_BUNDLER_URL.replace('CHAIN_ID', chainId);


export function BuyNft() {

    const walletClient = useSelector((state: RootState) => state.user.walletClient);

  const mintNft = async () => {
     if (walletClient !== null) {

         try {
             const smartAccount = await createSmartAccountClient({
                 signer: walletClient,
                 biconomyPaymasterApiKey,
                 bundlerUrl,
             });

             const saAddress = await smartAccount.getAccountAddress();
             const nftAddress = "0xA19b48f87975670268288D6C2C3dcb6A12D911B5";

             const nftData = encodeFunctionData({
                 abi: ABI,
                 functionName: "safeMint",
                 args: [saAddress as Hex],
             });

             const userOpResponse = await smartAccount.sendTransaction({
                 to: nftAddress,
                 data: nftData,
             });

             const { transactionHash } = await userOpResponse.waitForTxHash();

             console.log("transactionHash", transactionHash);

             const userOpReceipt = await userOpResponse.wait();

             if (userOpReceipt.success == "true") {
                 console.log("UserOp receipt", userOpReceipt);
                 console.log("Transaction receipt", userOpReceipt.receipt);
             }

         } catch (error: unknown) {
             if (error instanceof Error) {
                 console.error("Transaction Error:", error.message);
             }
         }
    } else {
      alert('Please connect your Testnet wallet first');
    }
    console.log('Minting NFT');
  };

  return (
    <div className="flex h-[70vh] justify-center items-center">
      <NFTCard
        onClick={mintNft}
        title="Celestial Harmonics"
        author="Lila Everwood"
        image={nftItem}
        price={1}
        download="#"
        extra="max-w-[370px] !h-auto"
      />
    </div>
  );
}
