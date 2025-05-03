import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import WestIcon from '@mui/icons-material/West';
import { Box, IconButton, Typography } from '@mui/material';

type ChatbotDiscussionHeaderProps = {
  title: string;
  onClose: () => void;
  onPrevious: () => void;
};

export const ChatbotDiscussionHeader: React.FC<
  ChatbotDiscussionHeaderProps
> = ({ title, onClose, onPrevious }: ChatbotDiscussionHeaderProps) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
          aria-label="previous"
          onClick={onPrevious}
          sx={(theme) => ({
            marginLeft: 'auto',
            color: theme.palette.grey[500]
          })}
          data-id="previousPageIcon"
        >
          <WestIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={(theme) => ({
            cursor: 'pointer',
            padding: '4px 8px',
            '&:hover': {
              borderRadius: 1,
              backgroundColor: theme.palette.grey['300'],
              padding: '4px 8px'
            }
          })}
          variant="h6"
          fontWeight={700}
          onClick={onPrevious}
          data-id="discussion-title"
        >
          {title?.slice(0, 60)}
        </Typography>
      </Box>

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
  );
};
