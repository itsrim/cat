import { Dispatch, SetStateAction, useMemo } from 'react';

import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import {
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  List,
  ListItemText
} from '@mui/material';

import i18n from '~/i18n';
import { LoaderComponent } from '~components/LoaderComponent';
import { CHAT_MODE } from '~constants/ChatMode';
import { Conversation } from '~services/conversation/types';

import { ChatbotHistoryDeleteButton } from './ChatbotHistoryDeleteButton';
import { groupByDate } from './utils';

type ChatbotHistoryBodyProps = {
  setMode: Dispatch<SetStateAction<CHAT_MODE>>;
  conversations: Conversation[];
  setSelectedConversation: Dispatch<SetStateAction<Conversation | null>>;
  setConversations: Dispatch<SetStateAction<Conversation[]>>;
  setIsHistoryRoom: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

type GroupedConversations = {
  label: string;
  items: Conversation[];
  date: Date;
}[];

export const ChatbotHistoryBody = ({
  conversations = [],
  setConversations,
  setSelectedConversation,
  setIsHistoryRoom,
  setMode,
  isLoading
}: ChatbotHistoryBodyProps) => {
  const groupedConversations: GroupedConversations = useMemo(() => {
    return groupByDate(conversations);
  }, [conversations]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (!groupedConversations.length) {
    return (
      <Box sx={{ flex: 1, px: 2, pt: 2 }}>
        <Typography variant="body2">{i18n.t('noConversation')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, pt: 2 }}>
      {groupedConversations.map(({ label, items }) => (
        <Box key={label} sx={{ mb: 1.5 }}>
          <Typography
            variant="body2"
            fontWeight={500}
            color="text.secondary"
            sx={{ mb: 1 }}
            data-id="groupHistoryDate"
          >
            {label}
          </Typography>

          <List disablePadding>
            {items.map((conv) => (
              <ListItem
                key={conv.id}
                disableGutters
                sx={(theme) => ({
                  px: 1,
                  py: 1,
                  borderRadius: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.2s',
                  '&:hover': { backgroundColor: theme.palette.grey[100] },
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                })}
              >
                <Box
                  onClick={() => {
                    setSelectedConversation(conv);
                    setMode(CHAT_MODE.ROOM);
                    setIsHistoryRoom(true);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    p: 0,
                    m: 0,
                    cursor: 'pointer'
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <QuestionAnswerOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    data-id="conversationHistoryTitle"
                    primary={conv.title || i18n.t('noTitle')}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: 14,
                          fontWeight: 600,
                          width: 412,
                          color: 'text.primary',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }
                      }
                    }}
                  />
                </Box>

                <ChatbotHistoryDeleteButton
                  conversationId={conv.id}
                  setConversations={setConversations}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};
