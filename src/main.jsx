import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import List from '../routes/List.jsx';
import Login from '../routes/login.jsx';
import Home from '../routes/Home.jsx';
import Page from '../routes/Page.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/list", element: <List/>},
      { path: "/login", element: <Login/>},
      { path: "/:id", element: <Page/>}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
