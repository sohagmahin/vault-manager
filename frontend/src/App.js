import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProfilePage from "./pages/Profile/profile";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/Login";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./components/Routes/PrivateRoute";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/resetPassword";

function App() {
  let authChecked = useAuthCheck();
  console.log(authChecked);
  return !authChecked ? (
    <div className="flex items-center justify-center">
      Authentication checking...
    </div>
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgetPassword" element={<ForgetPassword />} />
        <Route
          exact
          path="/password-reset/:userID/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

//test
