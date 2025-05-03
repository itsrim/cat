import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  CircularProgress
} from '@mui/material';

import i18n from '~/i18n';
import { formatDateToDDMMYY } from '~components/ChatbotHistory/utils';
import { CHAT_MODE } from '~constants/ChatMode';
import { getConversation, postConversation } from '~services/conversation';
import { Conversation } from '~services/conversation/types';

import ChatbotCard from '../ChatbotCard';
import { ChatbotHistoryRedirectButton } from '../ChatbotHistory/ChatbotHistoryRedirectButton';

type ChatbotHomeProps = {
  title: string;
  onClose: () => void;
  setMode: Dispatch<SetStateAction<CHAT_MODE>>;
  setSelectedConversation: Dispatch<SetStateAction<Conversation | null>>;
};

const ChatbotHome = ({
  title,
  onClose,
  setMode,
  setSelectedConversation
}: ChatbotHomeProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getConversation();
      if (Array.isArray(data)) {
        setConversations(data);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Box sx={{ maxHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          pl: 1,
          position: 'sticky',
          zIndex: 100
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {title && (
            <Typography variant="h6" fontWeight={700}>
              {title}
            </Typography>
          )}

          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
              marginLeft: 'auto',
              color: theme.palette.grey[500]
            })}
            data-id="closeChatbotDrawer"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography
          mt={1.5}
          variant="body1"
          sx={(theme) => ({ color: theme.palette.grey[500] })}
        >
          {/* TODO : Retrieve current user first name */}
          {i18n.t('welcomeMessage')}
        </Typography>
        <Typography
          sx={(theme) => ({
            color: theme.palette.grey[500]
          })}
          mt={2}
          mb={1}
          variant="subtitle2"
        >
          {i18n.t('newDiscussion')}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ChatbotCard
            title={i18n.t('accountingQuestion.title')}
            content={i18n.t('accountingQuestion.cardContent')}
            onClick={async () => {
              setMode(CHAT_MODE.QUESTION);
              const newConversation =
                await postConversation('question_balance');
              setSelectedConversation(newConversation);
            }}
          />
          <ChatbotCard
            title={i18n.t('ancQuestion.title')}
            content={i18n.t('ancQuestion.cardContent')}
            onClick={async () => {
              setMode(CHAT_MODE.ANC);
              const newConversation = await postConversation(
                'analyse_balance_anc_2022_06'
              );
              setSelectedConversation(newConversation);
            }}
          />
        </Stack>
        <Typography
          sx={(theme) => ({
            color: theme.palette.grey[500]
          })}
          mt={3}
          mb={1}
          variant="subtitle2"
        >
          {i18n.t('continueDiscussion')}
        </Typography>
        {isLoading && <CircularProgress size={20} />}
        <Stack direction="row" spacing={1.25}>
          {conversations?.length > 0 &&
            conversations.slice(0, 3).map((conv, index) => {
              return (
                <ChatbotCard
                  key={index}
                  title={conv.title?.slice(0, 50)}
                  content={formatDateToDDMMYY(conv.createdAt)}
                  onClick={() => {
                    setSelectedConversation(conv);
                    setMode(CHAT_MODE.ROOM);
                  }}
                />
              );
            })}
        </Stack>
        <ChatbotHistoryRedirectButton setMode={setMode} />
      </Box>
    </Box>
  );
};

export default ChatbotHome;
