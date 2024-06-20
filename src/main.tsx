import ReactDOM from 'react-dom/client';
import WebApp from '@twa-dev/sdk';

import pkg from '../package.json';

import App from './App.tsx';

console.log(`App: Tontune TMA | Version: ${pkg.version}`);

WebApp.ready();
WebApp.expand();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
