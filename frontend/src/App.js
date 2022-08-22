import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Auth from "./containers/Auth/Auth";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home/Home";
import ProfilePage from "./containers/Profile/profile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

//test
