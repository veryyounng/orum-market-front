import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <body>
      <Header />
      <Outlet />
    </body>
  );
}

export default App;
