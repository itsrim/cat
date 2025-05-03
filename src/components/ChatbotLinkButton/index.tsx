import { Box, Button } from '@mui/material';

type ChatbotLinkButtonProps = {
  endIcon?: React.ReactNode;
  title: string;
  href: string;
};

const ChatbotLinkButton = ({
  endIcon,
  title,
  href
}: ChatbotLinkButtonProps) => {
  return (
    <Box sx={{ pr: 1 }}>
      <Button
        variant="outlined"
        endIcon={endIcon}
        href={href}
        target="_blank"
        component="a"
        sx={(theme) => ({
          flex: 1,
          fontWeight: 500,
          borderRadius: 2,
          textTransform: 'none',
          justifyContent: 'space-between',
          pr: 1,
          px: 1.5,
          minWidth: 0,
          color: theme.palette.text.secondary,
          boxShadow: `0 1px 4px 0 ${theme.palette.grey[300]}`,
          border: `solid 1px ${theme.palette.grey[100]}`
        })}
      >
        {title}
      </Button>
    </Box>
  );
};

export default ChatbotLinkButton;
