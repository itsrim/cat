import { Card, Typography } from '@mui/material';

type ChatbotCardProps = {
  title: string;
  onClick: () => void;
  content: string;
};
const ChatbotCard = ({ title, onClick, content }: ChatbotCardProps) => {
  return (
    <Card
      onClick={onClick}
      sx={(theme) => ({
        boxShadow: `0 1px 4px 0 ${theme.palette.grey[300]}`,
        border: `solid 1px ${theme.palette.grey[100]}`,
        padding: 1,
        width: '50%',
        height: '118px',
        cursor: 'pointer'
      })}
    >
      <Typography fontWeight={600} fontSize={14} sx={{ paddingBottom: '10px' }}>
        {title}
      </Typography>
      <Typography sx={(theme) => ({ color: theme.palette.grey[500] })}>
        {content}
      </Typography>
    </Card>
  );
};

export default ChatbotCard;
