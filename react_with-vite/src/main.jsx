import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet, NavLink } from "react-router";

import Home from "./pages/Home.jsx";
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
          <NavLink to="/about" end>About</NavLink>
        </li>
        <li>
          <NavLink to="/login" end>Login</NavLink>
        </li>
        <li>
          <NavLink to="/register" end>Register</NavLink>
        </li>
        <li>
          <NavLink to="/concerts" end>ConcertsHome</NavLink>
        </li>
        <li>
          <NavLink to="/concerts/trending" end>Trending</NavLink>
        </li>
      </ul>
    </nav>
  )
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="concerts">
            <Route index element={<ConcertsHome />} />
            <Route path=":city" element={<City />} />
            <Route path="trending" element={<Trending />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
