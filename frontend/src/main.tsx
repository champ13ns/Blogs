import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './Pages/Login.tsx';
import {

  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SignUp from './Pages/SignUp.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:'/login',
    element : <Login />
  },{
    path : '/signup',
    element : <SignUp />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
