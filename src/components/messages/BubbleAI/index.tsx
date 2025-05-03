import { Box, Typography, useTheme } from '@mui/material';

type BubbleAIProps = {
  message: string;
};

export const BubbleAI = ({ message }: BubbleAIProps) => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="flex-start">
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          width: 21,
          height: 21,
          margin: '0 10px 0 0',
          borderRadius: '50%'
        }}
      />
      <Box
        sx={{
          px: 2,
          py: 1,
          borderRadius: 2,
          maxWidth: '80%',
          bgcolor: theme.palette.primary.contrastText,
          color: 'black',
          border: (theme) => `1px solid ${theme.palette.secondary.contrastText}`
        }}
        data-id="bubble-assistant"
      >
        <Typography variant="body2" whiteSpace="pre-line">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};
