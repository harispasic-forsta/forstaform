import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/pages/Dashboard";
import CCLibrary from "./components/pages/CCLibrary";
import AddCCtoLibrary from "./components/pages/AddCCtoLibrary";
import SignUp from './components/authentication/SignUp'
import Login from './components/authentication/Login'
import ForgotPassword from './components/authentication/ForgotPassword'
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {
  return (
      <header className="App">
        <div>
          <Router>
            <Navbar />
            <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cc-library" element={<CCLibrary />} />
              <Route path="/add-cc-to-library" element={<AddCCtoLibrary />} />
              </Route>
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </Router>
        </div>
      </header>
  );
}

export default App;
