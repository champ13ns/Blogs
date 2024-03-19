import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './Pages/Login.tsx';
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SignUp from './Pages/SignUp.tsx';
import Home from './Pages/Home.tsx';
import Blog from './Pages/Blog.tsx';
import CreateBlog from './Components/CreateBlog.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:'/login',
    element : <Login />
  },{
    path : '/signup',
    element : <SignUp />
  },{
    path : "/home",
    element : <Home />
  },{
    path : "/blog/:userId/:blogId",
    element : <Blog/>
  },{
    path : '/createBlog/:id',
    element : <CreateBlog />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
