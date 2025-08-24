import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Latest from "./pages/FeedLatest.jsx";
import Popular from "./pages/FeedPopular.jsx";
import Upload from "./pages/Upload.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Latest />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
