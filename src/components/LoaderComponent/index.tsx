import { Box, CircularProgress } from '@mui/material';

export const LoaderComponent = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <CircularProgress size={20} />
    </Box>
  );
};
