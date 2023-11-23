import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import Home from './pages/Home.tsx';
import ProductList from './pages/product/ProductList.tsx';
import ProductCreate from './pages/product/ProductCreate.tsx';
import ProductDetail from './pages/product/ProductDetail.tsx';
import MyCart from './pages/MyCart.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/product', element: <ProductList /> },
      { path: '/product/create', element: <ProductCreate /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/cart', element: <MyCart /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
