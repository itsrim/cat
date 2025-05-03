import { Stack } from '@mui/material';

import i18n from '~/i18n';

import { Message } from '../../services/message/types';
import { BubbleAI } from '../messages/BubbleAI';
import BubbleUser from '../messages/BubbleUser';

type BodyCharbotHistoryRoomProps = {
  messages: Message[];
  isLoading: boolean;
};

export const ChatbotDiscussionBody = ({
  messages,
  isLoading
}: BodyCharbotHistoryRoomProps) => {
  return (
    <Stack spacing={1}>
      {messages?.length > 0
        ? messages.map((msg, index) =>
            msg.owner === 'user' ? (
              <BubbleUser key={index} message={msg.message} />
            ) : (
              <BubbleAI key={index} message={msg.message} />
            )
          )
        : null}

      {isLoading && <BubbleAI message={i18n.t('loadingMessage')} />}
    </Stack>
  );
};
