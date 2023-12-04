import { createTheme } from '@mui/material/styles';

// 라이트 모드 테마
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFF',
    },
    text: {
      primary: '#301C3B',
    },
    primary: {
      main: '#EF5B2A',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#301C3B',
    },
    text: {
      primary: '#FFF',
    },
    primary: {
      main: '#EF5B2A',
    },
  },
});
