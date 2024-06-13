import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";

import Header from '../src/components/Header'
import Home from './components/Home';
import Profile from './components/Profile';
import Noaccess from './components/Noaccess';
import Manageuser from './components/Manageuser';
import Register from './components/Register';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
  return (
    <div className='AppLayout'>
      <Header />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/manageuser',
        element: <Manageuser />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/notpermitted',
        element: <Noaccess />
      },
    ]

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);


