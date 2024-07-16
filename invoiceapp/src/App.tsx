import React, { useEffect, useState } from "react";
import Register from "./Components/AuthenticationPages/Register";
import Login from "./Components/AuthenticationPages/Login";
import { Home } from "./Components/AuthenticationPages/Home";
import { NotFound } from "./Components/AuthenticationPages/NotFound";
import { HashRouter, Routes, Route, Navigation, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/MainPages/ProtectedRoute";
import MainPage from "./Components/MainPages/MainPage";

function Logout() {
  localStorage.clear()
  return <Navigate to={'/login'} />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element ={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
    
  )
}

export default App;
