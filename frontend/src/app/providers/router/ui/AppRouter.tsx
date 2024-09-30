import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch } from 'app/store/hooks';

import { fetchBeerStyles } from 'app/store/slices/beerStyles';

import { router } from 'shared/config/router/router';

const AppRouter = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBeerStyles());
  }, []);

  const renderContent = () => (
    <RouterProvider router={router} />
  );

  return renderContent();
};

export default AppRouter;
