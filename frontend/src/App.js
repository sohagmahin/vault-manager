import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderMerchants from "./components/Headers/Header";
import Auth from "./containers/Auth/Auth";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
