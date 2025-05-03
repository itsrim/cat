import { useState } from 'react';

import { Box, Paper, Slide } from '@mui/material';

import i18n from '~/i18n';
import { CHAT_MODE } from '~constants/ChatMode';
import { Conversation } from '~services/conversation/types';

import ChatbotDiscussionRoom from '../ChatbotDiscussion';
import ChatbotHistory from '../ChatbotHistory';
import ChatbotHome from '../ChatbotHome';

type ChatbotMainRedirectProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ChatbotMainRedirect = ({ isOpen, onClose }: ChatbotMainRedirectProps) => {
  const [mode, setMode] = useState<CHAT_MODE>(CHAT_MODE.HOME);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isHistoryRoom, setIsHistoryRoom] = useState<boolean>(false);
  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 512,
          height: 522,
          zIndex: 1300,
          mb: 5,
          mr: 5
        }}
        data-id="comment-drawer"
      >
        <Paper
          sx={{
            width: '100%',
            height: '100%',
            p: 2,
            borderRadius: 2,
            boxShadow: 6,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Slide
            direction="left"
            in={mode === CHAT_MODE.HOME}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <ChatbotHome
                title={i18n.t('myAssistant')}
                onClose={onClose}
                setMode={setMode}
                setSelectedConversation={setSelectedConversation}
              />
            </Box>
          </Slide>
          <Slide
            direction="left"
            in={mode === CHAT_MODE.QUESTION}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {selectedConversation && (
                <ChatbotDiscussionRoom
                  title={i18n.t('accountingQuestion.title')}
                  onClose={onClose}
                  mode={mode}
                  setMode={setMode}
                  selectedConversation={selectedConversation}
                  isHistoryRoom={isHistoryRoom}
                />
              )}
            </Box>
          </Slide>
          <Slide
            direction="left"
            in={mode === CHAT_MODE.HISTORY}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <ChatbotHistory
                title={i18n.t('history.title')}
                onClose={onClose}
                setMode={setMode}
                setSelectedConversation={setSelectedConversation}
                setIsHistoryRoom={setIsHistoryRoom}
              />
            </Box>
          </Slide>
          <Slide
            direction="left"
            in={mode === CHAT_MODE.ROOM}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {selectedConversation && (
                <ChatbotDiscussionRoom
                  title={selectedConversation.title}
                  onClose={onClose}
                  mode={mode}
                  setMode={setMode}
                  selectedConversation={selectedConversation}
                  isHistoryRoom={isHistoryRoom}
                />
              )}
            </Box>
          </Slide>
          <Slide
            direction="left"
            in={mode === CHAT_MODE.ANC}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {selectedConversation && (
                <ChatbotDiscussionRoom
                  title={i18n.t('ancQuestion.subtitle')}
                  onClose={onClose}
                  mode={mode}
                  setMode={setMode}
                  selectedConversation={selectedConversation}
                  isHistoryRoom={isHistoryRoom}
                />
              )}
            </Box>
          </Slide>
        </Paper>
      </Box>
    </Slide>
  );
};

export default ChatbotMainRedirect;
