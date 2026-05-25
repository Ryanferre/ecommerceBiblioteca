import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css'
import App from './App.tsx'
import HomePage from './Home/Home.tsx'
import ReactDOM from 'react-dom/client'
import Anuncio from './Pages/ProductisClient/Products.tsx';
import EditBook from './Pages/EditeProduct/EditProduct.tsx';
import Cart from './Pages/Cart/Cart.tsx';
import Allproducts from './Pages/TodososPrdutos/AllProduct.tsx';
import Apress from './Pages/ApressProduct/Apress.tsx';

const apiKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const rounter= createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [{
      path: '/',
      element: <HomePage/>
    },
    {
      path: '/Anuncio',
      element: <Anuncio/>
    },
    {
      path: '/Edite',
      element: <EditBook />
    },
    {
      path: '/Cart',
      element: <Cart />
    },
    {
      path: '/Allproducts',
      element: <Allproducts />
    },
    {
      path: '/Apress',
      element: <Apress />
    }
    ]
  }
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ClerkProvider publishableKey={apiKey}>
      <RouterProvider router={rounter} />
    </ClerkProvider>
);
