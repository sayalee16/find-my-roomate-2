import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import List from '../routes/List.jsx';
import Login from "../routes/login.jsx"
import Home from '../routes/Home.jsx';
import Page from '../routes/Page.jsx';
import ProfilePage from '../routes/ProfilePage.jsx';
import Register from '../routes/Register.jsx';
import { AuthContextProvider } from './context/authContext.jsx';
import UpdatePage from '../routes/UpdatePage.jsx';
import SearchResults from '../routes/SearchResults.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/list", element: <List/>},
      { path: "/login", element: <Login/>},
      { path: "/view-more", element: <Page/> },
      { path: "/profile", element: <ProfilePage/>},
      { path: "/register", element: <Register/>},
      { path: "/login", element: <Login/>},
      { path: "/profile/update-info", element: <UpdatePage/>},
      { path: "/search-results", element: <SearchResults/>}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </StrictMode>,
)
