import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HeaderMerchants from "./components/Headers/Header";
import Login from './containers/Login/Login';
import Footer from './components/Footer/Footer';
import Home from './containers/Home/Home';

function App() {

  return (
    <Router>
      <HeaderMerchants />
      <Switch>
        <Route path="/Login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
