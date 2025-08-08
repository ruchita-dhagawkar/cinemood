import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Suspense, lazy } from "react";
import Header from "./components/Header";

const Login = lazy(() => import("./pages/Login"));
const Browse = lazy(() => import("./pages/Browse"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const Watch = lazy(() => import("./pages/Watch"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense
        fallback={
          <div className="text-white text-center mt-10">Loading...</div>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watch/:movieId" element={<Watch />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
