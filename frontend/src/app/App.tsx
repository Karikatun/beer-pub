import { Suspense } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, setupStore } from 'app/store/store';

import { classNames } from 'shared/lib/classNames';

import { AppRouter } from 'providers/router';
import { useTheme } from 'providers/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { Overlays } from 'widgets/Overlays/ui/Overlays';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <Provider store={setupStore}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline />
            <AppRouter />
            <Overlays />
          </PersistGate>
        </Provider>
      </Suspense>
    </div>
  );
};

export default App;
