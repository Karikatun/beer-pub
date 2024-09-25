import { createBrowserRouter } from 'react-router-dom';

import { MainAppLayout } from 'widgets/MainAppLayout';

import { NotFound } from 'pages/NotFound';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';

export const appRouter = [
  {
    element: <MainAppLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export const router = createBrowserRouter(appRouter);
