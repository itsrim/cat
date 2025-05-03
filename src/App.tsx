import { createRef } from 'react';

import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import ChatbotWidget from './components/ChatbotWidget';
import { SnackbarHelperConfigurator } from './helpers/SnackBarNotifications';
import theme from './theme';
import './i18n';

function App() {
  const notistackRef = createRef<SnackbarProvider>();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        preventDuplicate
        hideIconVariant={false}
      >
        <SnackbarHelperConfigurator />
        <h1>MyBot 🤖</h1>
        <ChatbotWidget />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
