import { compile, NetworkProvider } from '@ton-community/blueprint';
import { Address, toNano } from 'ton-core';

import { TuneNft } from '../wrappers/TuneNft';

import { buildCollectionContentCell } from './contentUtils/off-chain';

export async function run(provider: NetworkProvider) {
    const nftCollection = provider.open(
        TuneNft.createFromConfig(
            {
                ownerAddress: provider.sender().address as Address,
                nextItemIndex: 0,
                collectionContent: buildCollectionContentCell({
                    collectionContent:
                        'https://raw.githubusercontent.com/Cosmodude/TonTune/main/collectionMetadata.json',
                    commonContent: '',
                }),
                nftItemCode: await compile('NftItem'),
                royaltyParams: {
                    royaltyFactor: Math.floor(Math.random() * 100),
                    royaltyBase: 100,
                    royaltyAddress: provider.sender().address as Address,
                },
            },
            await compile('TuneNft'),
        ),
    );

    await nftCollection.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(nftCollection.address);

    // run methods on `nftCollection`
}
