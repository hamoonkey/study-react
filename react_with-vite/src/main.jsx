import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet, NavLink, createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home.jsx";
import App from "./pages/App/App.jsx";
import About from "./pages/About.jsx";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ConcertsHome from "./pages/Concerts/ConcertsHome.jsx";
import City from "./pages/Concerts/City.jsx";
import Trending from "./pages/Concerts/Trending.jsx";

function Layout() {
  return (
    <div>
      Layout
      <Navigation></Navigation>
      <Outlet></Outlet>
    </div>
  )
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/app" end>App</NavLink>
        </li>
        <li>
          <NavLink to="/about" end>About</NavLink>
        </li>
        <li>
          <NavLink to="/login" end>Login</NavLink>
        </li>
        <li>
          <NavLink to="/register" end>Register</NavLink>
        </li>
        <li>
          <NavLink to="/concerts">ConcertsHome</NavLink>
        </li>
        <li>
          <NavLink to="/concerts/trending" end>Trending</NavLink>
        </li>
      </ul>
    </nav>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "app",
        element: <App></App>
      },
      {
        path: "about",
        element: <About></About>
      },
      {
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "login",
            element: <Login></Login>
          },
          {
            path: "register",
            element: <Register></Register>
          }
        ]
      },
      {
        path: "concerts",
        children: [
          {
            index: true,
            element: <ConcertsHome></ConcertsHome>
          },
          {
            path: ":city",
            element: <City></City>
          },
          {
            path: "trending",
            element: <Trending></Trending>
          }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
