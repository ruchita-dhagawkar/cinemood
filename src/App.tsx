import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { lazy } from "react";
import Header from "./components/Header";

const Login = lazy(() => import("./pages/Login"));
const Browse = lazy(() => import("./pages/Browse"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const Watch = lazy(() => import("./pages/Watch"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/watch/:movieId" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
