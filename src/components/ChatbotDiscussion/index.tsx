import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';

import i18n from '~/i18n';
import { CHAT_MODE } from '~constants/ChatMode';
import { QuestionSuggestions } from '~constants/QuestionSuggestion';
import SnackBarNotifications from '~helpers/SnackBarNotifications';
import { Conversation } from '~services/conversation/types';
import {
  getConversationMessages,
  postConversationMessage
} from '~services/message';
import { Message } from '~services/message/types';

import InputChatbotField from '../InputChatbotField';
import { BubbleAI } from '../messages/BubbleAI';
import BubbleSuggestion from '../messages/BubbleSuggestion';

import { ChatbotDiscussionBody } from './ChatbotDiscussionBody';
import { ChatbotDiscussionHeader } from './ChatbotDiscussionHeader';

type ChatbotDiscussionRoomProps = {
  title: string;
  onClose: () => void;
  mode: string;
  setMode: Dispatch<SetStateAction<CHAT_MODE>>;
  selectedConversation: Conversation;
  isHistoryRoom: boolean;
};
const ChatbotDiscussionRoom = ({
  title,
  onClose,
  mode,
  setMode,
  selectedConversation,
  isHistoryRoom
}: ChatbotDiscussionRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isQuestionMode = mode === 'question';
  const isANCMode = mode === 'anc';
  const welcomeQuestionText = i18n.t('accountingQuestion.initialQuestion');
  const welcomeANCText = i18n.t('ancQuestion.initialQuestion');

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isQuestionMode || !isANCMode) {
      setMessages(selectedConversation.messages);
    }
  }, [isQuestionMode, isANCMode, selectedConversation.messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  const handleSendConversationMessage = async (message: string) => {
    const newMessage = {
      id: '-1',
      owner: 'user',
      idConversation: selectedConversation.id,
      createdAt: new Date().toDateString(),
      documentContent: null,
      idDocument: null,
      message: message
    };
    setMessages([...messages, newMessage]);

    const data = await postConversationMessage(
      selectedConversation.id,
      message
    );
    if (!data.code) {
      const updatedMessagesList = await getConversationMessages(
        selectedConversation.id
      );
      setMessages(updatedMessagesList);
    } else {
      SnackBarNotifications.error(data.message);
    }
  };

  return (
    <>
      <ChatbotDiscussionHeader
        title={title}
        onClose={onClose}
        onPrevious={() => {
          setMode(CHAT_MODE.HOME);
        }}
      />
      <Box flex={1} mt={2} overflow="auto" ref={scrollRef}>
        {(isQuestionMode || isANCMode) && (
          <Box sx={{ paddingBottom: 2 }}>
            <BubbleAI
              message={isQuestionMode ? welcomeQuestionText : welcomeANCText}
            />
          </Box>
        )}
        {isQuestionMode &&
          QuestionSuggestions.map((question, i) => (
            <BubbleSuggestion
              key={i}
              message={question}
              handleSendConversationMessage={handleSendConversationMessage}
            />
          ))}
        <ChatbotDiscussionBody messages={messages} isLoading={isLoading} />
      </Box>
      {!isHistoryRoom && (
        <InputChatbotField
          setMessages={setMessages}
          mode={mode}
          handleSendConversationMessage={handleSendConversationMessage}
          conversationId={selectedConversation.id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default ChatbotDiscussionRoom;
