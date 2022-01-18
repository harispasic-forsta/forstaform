import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/pages/Dashboard";
import CCLibrary from "./components/pages/CCLibrary";
import AddCCtoLibrary from "./components/pages/AddCCtoLibrary";
import RegistrationPage from "./components/pages/registrationPage";



function App() {
  return (
    <header className="App">
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cc-library" element={<CCLibrary />} />
            <Route path="/add-cc-to-library" element={<AddCCtoLibrary />} />
          </Routes>
        </Router>
        <RegistrationPage />
      </div>
    </header>
  );
}

export default App;
