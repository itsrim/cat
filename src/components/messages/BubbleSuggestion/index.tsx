import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type BubbleSuggestionProps = {
  message: string;
  handleSendConversationMessage: (message: string) => Promise<void>;
};

const BubbleSuggestion = ({
  message,
  handleSendConversationMessage
}: BubbleSuggestionProps) => {
  const theme = useTheme();

  const handleClick = () => {
    handleSendConversationMessage(message);
  };
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      sx={{
        borderColor: theme.palette.primary.main,
        color: 'black',
        borderRadius: 2,
        textAlign: 'left',
        justifyContent: 'flex-start',
        mt: 1,
        px: 1.5,
        py: 1,
        width: 'fit-content',
        maxWidth: '100%',
        ml: 4,
        cursor: 'pointer'
      }}
    >
      <Typography variant="body2" fontWeight={600}>
        {message}
      </Typography>
    </Button>
  );
};

export default BubbleSuggestion;
