import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/pages/Dashboard";
import CCLibrary from "./components/pages/CCLibrary";
import AddCCtoLibrary from "./components/pages/AddCCtoLibrary";
import SignUp from "./components/authentication/SignUp";
import SignIn from "./components/authentication/SignIn";
import ForgotPassword from "./components/authentication/ForgotPassword";
import { AuthProvider } from "./components/contexts/AuthContext";
import UpdateProfile from "./components/authentication/UpdateProfile";
import SignOut from "./components/authentication/SignOut";


function App() {
  return (
    <header className="App">
      <div>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cc-library" element={<CCLibrary />} />
              <Route path="/add-cc-to-library" element={<AddCCtoLibrary />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </header>
  );
}

export default App;
