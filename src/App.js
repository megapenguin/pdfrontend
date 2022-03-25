import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginDashboard from "./views/LoginDashboard";
import { Routes, Router, Route, BrowserRouter } from "react-router-dom";

import MainProfileDashboard from "./views/MainProfileDashboard";
import ProviderDashboard from "./views/ProviderDashboard";
import ProfileInfoDashboard from "./views/ProfileInfoDashboard";
import RegisterLoginDashboard from "./views/RegisterLoginDashboard";
import RegistrationFormDashboard from "./views/RegistrationFormDashboard";
import ProviderRegistrationDashboard from "./views/ProviderRegistrationDashboard";
import ManageSpaceDashboard from "./views/ManageSpaceDashboard";
import HomePageDashboard from "./views/HomePageDashboard";
import FindParkingSpaceDashboard from "./views/FindParkingSpaceDashboard";
import AddParkingLotDashboard from "./views/AddParkingLotDashboard";
import AccountVerificationDashboard from "./views/AccountVerificationDashboard";
import LoginProtectedRoutes from "./ProtectedRoutes/LoginProtectedRoutes";
import MainProtectedRoutes from "./ProtectedRoutes/MainProtectedRoutes";
import { AuthContext } from "./GlobalContext/AuthContext";
import Layout from "./components/layout/Layout";
import { Login } from "./components/login";

function App() {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginProtectedRoutes
              isLogin={true}
              component={LoginDashboard}
              auth={auth}
            />
          }
        />
        <Route
          path="/main"
          element={
            <LoginProtectedRoutes
              isLogin={false}
              component={MainProfileDashboard}
              auth={auth}
            />
          }
        />
        <Route
          path="/"
          element={
            <LoginProtectedRoutes
              isLogin={false}
              component={MainProfileDashboard}
              auth={auth}
            />
          }
        />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;