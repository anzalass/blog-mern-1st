import logo from "./logo.svg";
import React from "react";
import TopBar from "./components/topbar/TopBar";
import Header from "./components/header/Header";
// import Home from "./pages/home/Home";
// import Single from "./pages/single/Single";
// import Write from "./pages/write/Write";
// import Settings from "./pages/settings/Settings";
// import Login from "./pages/login/Login";
// import Regis from "./pages/regis/Regis";
import Home from "./pages/homepage/Homepage";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Regis from "./pages/register/Register";
import Settings from "./pages/settings/Settings";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Categori from "./pages/categories/Categori";

function App() {
  const { user } = useContext(Context);
  return (
    <div>
      <Router>
        <TopBar />
        <Routes>
          <Route element={<TopBar />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<Single />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Login />} />
          <Route path="/regis" element={user ? <Home /> : <Regis />} />
          <Route path="/settings" element={user ? <Settings /> : <Login />} />
          <Route path="/categori" element={<Categori />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
