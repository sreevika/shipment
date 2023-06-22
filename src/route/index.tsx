import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    
    </Routes>
  );
};
export default Router;
