import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { Container, ThemeProvider, Toolbar, createTheme } from '@mui/material';
import { BreadcrumbsNavBar } from './components/BreadcrumbsNavBar';
import ScrollTop from './components/ScrollTop';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import { useMemo, useState } from 'react';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  // 헤더에 연결하고 싶은 부분
  // function MyApp() {
  //   const theme = useTheme();
  //   const colorMode = React.useContext(ColorModeContext);
  //   return (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         width: '100%',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         bgcolor: 'background.default',
  //         color: 'text.primary',
  //         borderRadius: 1,
  //         p: 3,
  //       }}
  //     >
  //       {theme.palette.mode} mode
  //       <IconButton
  //         sx={{ ml: 1 }}
  //         onClick={colorMode.toggleColorMode}
  //         color="inherit"
  //       >
  //         {theme.palette.mode === 'dark' ? (
  //           <Brightness7Icon />
  //         ) : (
  //           <Brightness4Icon />
  //         )}
  //       </IconButton>
  //     </Box>
  //   );
  // }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <BreadcrumbsNavBar />
          <Toolbar id="back-to-top-anchor" />
          <Outlet />
          <ScrollTop>
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
