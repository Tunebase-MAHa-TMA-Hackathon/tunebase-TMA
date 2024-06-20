import { FC, PropsWithChildren } from 'react';
import { THEME, TonConnectUIProvider as TCUIProvider } from '@tonconnect/ui-react';


const manifestUrl = 'https://raw.githubusercontent.com/Tontune/tontune-telegram-web-app/master/manifest.json';


export const TonConnectUIProvider: FC<PropsWithChildren> = ({ children }) => (
    <TCUIProvider
        manifestUrl={manifestUrl}
        actionsConfiguration={{
            twaReturnUrl: 'https://t.me/TontuneBot',
        }}
        uiPreferences={{ theme: THEME.LIGHT }}
    >
        {children}
    </TCUIProvider>
);
