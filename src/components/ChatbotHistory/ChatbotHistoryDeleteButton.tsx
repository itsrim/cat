import { SetStateAction, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import SnackBarNotifications from '~helpers/SnackBarNotifications';
import { deleteConversation } from '~services/conversation';
import { Conversation } from '~services/conversation/types';

type ChatbotHistoryDeleteButtonProps = {
  conversationId: string;
  setConversations: (value: SetStateAction<Conversation[]>) => void;
};

export const ChatbotHistoryDeleteButton = ({
  conversationId,
  setConversations
}: ChatbotHistoryDeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await deleteConversation(conversationId);
      } catch (err) {
        SnackBarNotifications.error('debug delete error');
        console.error(err); // todo Snackbar notif delete failed
      }
      setIsLoading(false);
    }, 1500);
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
  };

  return (
    <Box
      onClick={handleDelete}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <DeleteOutlineIcon
            sx={{
              color: 'grey.500',
              transition: 'opacity 0.2s',
              position: 'absolute',
              opacity: 1,
              '&:hover': { opacity: 0 }
            }}
          />
          <DeleteIcon
            sx={{
              color: 'error.main',
              transition: 'opacity 0.2s',
              position: 'absolute',
              opacity: 0,
              '&:hover': { opacity: 1 }
            }}
          />
        </>
      )}
    </Box>
  );
};
