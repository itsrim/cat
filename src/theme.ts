import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7dd5d5',
      light: '#e7fafe',
      dark: '#60c7c7',
      contrastText: '#fff'
    },
    secondary: {
      main: '#e0c2ff',
      dark: '#212121',
      light: '#e6f8fb',
      contrastText: '#cccccc'
    },
    error: {
      light: '#FFE7EC',
      main: '#FE3A5E',
      dark: '#303f9f',
      contrastText: '#fff'
    }
  }
});

export default theme;
