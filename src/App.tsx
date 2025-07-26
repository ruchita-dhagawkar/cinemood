import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import BrowsePage from "./pages/BrowsePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/browse" element={<BrowsePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
