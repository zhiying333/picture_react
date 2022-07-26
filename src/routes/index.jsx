import { Navigate } from "react-router-dom";

import Login from '../pages/Login';
import Register from '../pages/Register';
import Msite from '../pages/Msite';

export default [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/msite',
    element: <Msite />
  },
  {
    path: '/',
    element: <Navigate to="/login" />
  }
]