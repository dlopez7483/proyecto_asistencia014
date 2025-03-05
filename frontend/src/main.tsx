import { createRoot } from 'react-dom/client'

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './views/login/Login';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
      errorElement: <div>404</div>
    }
  ]
)

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
