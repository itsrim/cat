import { useTheme, Box, Typography } from '@mui/material';

type BubbleUserProps = {
  message: string;
};

const BubbleUser = ({ message }: BubbleUserProps) => {
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="flex-end">
      <Box
        sx={{
          px: 2,
          py: 1,
          my: '10px',
          borderRadius: 2,
          maxWidth: '80%',
          bgcolor: theme.palette.primary.light,
          color: 'black'
        }}
        data-id="bubble-user"
      >
        <Typography variant="body2">{message}</Typography>
      </Box>
    </Box>
  );
};

export default BubbleUser;
