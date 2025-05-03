import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import ChatbotWidget from '../components/ChatbotWidget';
import { SnackbarHelperConfigurator } from '../helpers/SnackBarNotifications';
import theme from '../theme';

const ChatBotWidgetComponent = (
  <SnackbarProvider maxSnack={4} preventDuplicate>
    <SnackbarHelperConfigurator />
    <ThemeProvider theme={theme}>
      <ChatbotWidget />
    </ThemeProvider>
  </SnackbarProvider>
);

export default {
  ChatbotWidget: ChatBotWidgetComponent
};
