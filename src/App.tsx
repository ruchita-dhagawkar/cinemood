import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import Header from "./components/Header";
import Watchlist from "./pages/Watchlist";
import Watch from "./pages/Watch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="pt-22"></div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watch" element={<Watch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
