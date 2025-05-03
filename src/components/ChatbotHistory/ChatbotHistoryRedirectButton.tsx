import { Dispatch, SetStateAction } from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button } from '@mui/material';

import i18n from '~/i18n';
import { CHAT_MODE } from '~constants/ChatMode';

type ChatbotHistoryRedirectButtonProps = {
  setMode: Dispatch<SetStateAction<CHAT_MODE>>;
};
export const ChatbotHistoryRedirectButton = ({
  setMode
}: ChatbotHistoryRedirectButtonProps) => {
  return (
    <Box mt={2}>
      <Button
        data-id="historyButton"
        variant="outlined"
        sx={(theme) => ({
          borderRadius: 2,
          textTransform: 'none',
          justifyContent: 'center',
          pr: 1,
          px: 1.5,
          minWidth: 0,
          color: theme.palette.text.secondary,
          boxShadow: `0 1px 4px 0 ${theme.palette.grey[300]}`,
          border: `solid 1px ${theme.palette.grey[100]}`
        })}
        onClick={() => setMode(CHAT_MODE.HISTORY)}
      >
        {i18n.t('history.consult')} <ArrowForwardIcon />
      </Button>
    </Box>
  );
};
