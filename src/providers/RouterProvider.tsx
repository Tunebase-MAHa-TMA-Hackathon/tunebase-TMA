import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom';

import { Layout } from '@/layout';
import { artistsMock } from '@/mock/artists.ts';
import { leadersMock } from '@/mock/leaders.ts';
import { Artist } from '@/screens/Artist';
import { Artists } from '@/screens/Artists';
import { Battles } from '@/screens/Battles';
import { BuyNft } from '@/screens/BuyNft';
import { Event } from '@/screens/Event';
import { Events } from '@/screens/Events';
import { Home } from '@/screens/Home';
import { Leaderboard } from '@/screens/Leaderboard';
import { MyTune } from '@/screens/MyTune';
import { WorkInProgress } from '@/screens/WorkInProgress';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      { path: '/buy-nft', element: <BuyNft /> },
      {
        path: '/artists',
        children: [
          {
            index: true,
            element: <Artists />,
          },
          {
            path: 'nft-musician',
            element: <Artist artistInfo={artistsMock[1]} />,
          },
          {
            path: 'm88g',
            element: <Artist artistInfo={artistsMock[0]} />,
          },
        ],
      },
      { path: '/my-tune', element: <MyTune /> },
      { path: '/leaderboard', element: <Leaderboard leaders={leadersMock} /> },
      { path: '/staking', element: <WorkInProgress /> },
      { path: '/battles', element: <Battles /> },
      { path: '/tokens', element: <WorkInProgress /> },
      {
        path: '/events',
        children: [
          {
            index: true,
            element: <Events />,
          },
          {
            path: ':id',
            element: <Event />,
          },
        ],
      },
    ],
  },
]);

export const RouterProvider = () => <ReactRouterProvider router={router} />;
