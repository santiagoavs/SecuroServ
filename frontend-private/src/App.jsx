// En src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CarDetails from "./pages/CarDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CarDetails" element={<CarDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;