import { useCallback, useEffect, useState } from 'react';

import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Box, CircularProgress, IconButton, InputBase } from '@mui/material';

import i18n from '~/i18n';
import { CHAT_MODE, MAX_MESSAGES_PER_ROOM } from '~constants/ChatMode';
import type { Message } from '~services/message/types';

type InputChatbotFieldProps = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  mode: string;
  presetSuggestionMessage?: string;
  setPresetSuggestionMessage?: React.Dispatch<React.SetStateAction<string>>;
  conversationId: string;
  handleSendConversationMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputChatbotField = ({
  presetSuggestionMessage = '',
  mode,
  setPresetSuggestionMessage,
  conversationId,
  handleSendConversationMessage,
  isLoading,
  setIsLoading
}: InputChatbotFieldProps) => {
  const isOverTimeLimit = false; // debug, wait from backend
  const [input, setInput] = useState<string>('');
  const [messageCountByRoom, setMessageCountByRoom] = useState<
    Record<string, number>
  >({});
  const room = parseInt(conversationId);
  const currentCount = messageCountByRoom[room] || 0;
  const isOverLimit = currentCount >= MAX_MESSAGES_PER_ROOM;
  const handleSend = useCallback(async (): Promise<void> => {
    if (isOverLimit || isOverTimeLimit || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const trimmed = (input || presetSuggestionMessage || '').trim();
      if (!trimmed || isOverLimit || isOverTimeLimit) {
        return;
      }
      if (!input && presetSuggestionMessage) {
        setPresetSuggestionMessage?.('');
      }
      setInput('');
      await handleSendConversationMessage(trimmed);
      setMessageCountByRoom((prev) => ({
        ...prev,
        [room]: (prev[room] || 0) + 1
      }));
    } finally {
      setIsLoading(false);
    }
  }, [
    handleSendConversationMessage,
    input,
    isOverLimit,
    isOverTimeLimit,
    presetSuggestionMessage,
    room,
    setPresetSuggestionMessage,
    isLoading
  ]);

  useEffect(() => {
    if (presetSuggestionMessage) {
      handleSend();
    }
  }, [presetSuggestionMessage, handleSend]);

  return (
    <Box
      data-id="input-chatbot"
      sx={(theme) => ({
        display: 'flex',
        mt: 2,
        py: 1,
        borderRadius: '8px',
        bgcolor: theme.palette.grey[100]
      })}
    >
      {mode === CHAT_MODE.ANC && (
        <IconButton onClick={handleSend} disabled={isOverLimit || isLoading}>
          <AddPhotoAlternateOutlinedIcon />
        </IconButton>
      )}
      <InputBase
        data-id="inputChatbotField"
        sx={{ ml: 1, flex: 1 }}
        placeholder={i18n.t(!isOverLimit ? 'newDiscussion' : 'limitMax5')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        size="small"
        disabled={isOverLimit || isLoading}
        inputProps={{
          'aria-label': i18n.t('inputPlaceHolder'),
          maxLength: 1000
        }}
      />
      <IconButton onClick={handleSend} disabled={isOverLimit || isLoading}>
        {isLoading ? (
          <Box
            sx={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress size={20} data-id="loaderPostMessage" />
          </Box>
        ) : (
          <ArrowCircleRightOutlinedIcon data-id="arrowSendMessageIcon" />
        )}
      </IconButton>
    </Box>
  );
};
export default InputChatbotField;
