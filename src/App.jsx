import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import ScanToSeeMenuApp from "./ScanToSeeMenuApp";
import CustomerMenu from "./CustomerMenu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const App = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const configureStatusBar = async () => {
        try {
          await StatusBar.setStyle({ style: Style.Dark });
          await StatusBar.setBackgroundColor({ color: '#7c3aed' });
          await StatusBar.setOverlaysWebView({ overlay: false });
        } catch (e) {
          console.error("Status bar error", e);
        }
      };
      configureStatusBar();
    }
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Management Panel */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ScanToSeeMenuApp />
              </PrivateRoute>
            }
          />

          {/* Public Customer Menu with Restaurant ID */}
          <Route path="/menu/:restaurantId" element={<CustomerMenu />} />

          {/* Legacy route redirect or handle gracefully if needed, for now just redirect to home if accessed without ID */}
          <Route path="/menu" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;