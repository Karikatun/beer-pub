import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from 'providers/ErrorBoundary';
import { ThemeProvider } from 'providers/ThemeProvider';

import App from './app/App';

import 'shared/config/i18n/i18n';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ErrorBoundary>
);
