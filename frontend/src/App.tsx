// src/App.tsx
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateDelivery from "./pages/CreateDelivery";
import VisualizeDelivery from "./pages/VisualizeDelivery";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register/delivery" element={<CreateDelivery/>} />
      <Route path="/visualize/delivery/:id" element={<VisualizeDelivery />} />
    </Routes>
  );
}

export default App;
