import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HeaderMerchants from "./components/Headers/Header";
import Auth from "./containers/Auth/Auth";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home/Home";

function App() {
  return (
    <Router>
      {/* <HeaderMerchants /> */}
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/" component={Home} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
