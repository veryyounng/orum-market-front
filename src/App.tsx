import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { Container, Toolbar } from '@mui/material';
import { BreadcrumbsNavBar } from './components/BreadcrumbsNavBar';
import ScrollTop from './components/ScrollTop';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

function App() {
  return (
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
  );
}

export default App;
