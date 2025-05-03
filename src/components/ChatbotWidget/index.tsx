import { useState } from 'react';

import { Fab, useTheme } from '@mui/material';

import ChatbotMainRedirect from '../ChatbotMainRedirect';

const ChatbotWidget = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {!isOpen && (
        <Fab
          data-id="chatbotWidget"
          onClick={() => setIsOpen((prev) => !prev)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: theme.palette.primary.main,
            boxShadow: 3,
            width: 56,
            height: 56,
            '&:hover': {
              bgcolor: theme.palette.primary.dark
            }
          }}
        />
      )}
      {isOpen && (
        <ChatbotMainRedirect isOpen onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};
export default ChatbotWidget;
