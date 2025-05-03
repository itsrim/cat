import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { CHAT_MODE } from '~constants/ChatMode';
import { getConversation } from '~services/conversation';
import { Conversation } from '~services/conversation/types';

import { ChatbotDiscussionHeader } from '../ChatbotDiscussion/ChatbotDiscussionHeader';

import { ChatbotHistoryBody } from './ChatbotHistoryBody';

type ChatbotHistoryProps = {
  title: string;
  onClose: () => void;
  setMode: Dispatch<SetStateAction<CHAT_MODE>>;
  setSelectedConversation: Dispatch<SetStateAction<Conversation | null>>;
  setIsHistoryRoom: Dispatch<SetStateAction<boolean>>;
};
const ChatbotHistory = ({
  title,
  onClose,
  setMode,
  setSelectedConversation,
  setIsHistoryRoom
}: ChatbotHistoryProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getConversation();
      if (!res) {
        alert('DEBUG : Token error, please refresh.');
      } else {
        setConversations(res);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChatbotDiscussionHeader
        title={title}
        onClose={onClose}
        onPrevious={() => {
          setMode(CHAT_MODE.HOME);
        }}
      />

      <ChatbotHistoryBody
        conversations={conversations}
        setConversations={setConversations}
        setSelectedConversation={setSelectedConversation}
        setMode={setMode}
        isLoading={isLoading}
        setIsHistoryRoom={setIsHistoryRoom}
      />
    </Box>
  );
};
export default ChatbotHistory;
