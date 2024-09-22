import { React, useState } from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { AuthProvider } from "./provider/authProvider.jsx";

import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SymptomPage from "./pages/SymptomPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <>
                  <Navbar /> 
                  <div className="p-4 sm:ml-64">
                    <div className="p-4  rounded-lg  mt-14">
                      <Outlet />
                    </div>
                  </div>
                </>
              }
            >
              <Route path="/" element={<SymptomPage />} />
              <Route path="/symptom" element={<SymptomPage />} />
              <Route path="/report" element={<ReportPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        
      </AuthProvider>
    </Router>
  );
}

export default App;
