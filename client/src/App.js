import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Products from "./components/layout/Products";
import Filter from "./components/layout/Filter";
import Profile from "./components/layout/Profile";
import About from "./components/layout/About";
import UpdateProfile from "./components/layout/UpdateProfile";
import Landing from "./components/layout/Landing";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Details from  "./components/layout/Details"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

if(!localStorage.getItem("token")){
  localStorage.setItem("token", "");
}
const App = () => {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route  path="/product/:id" component={Details} />
                <Route exact path="/landing">
                    <Landing />
                </Route>
                <Route exact path="/update_profile">
                    <UpdateProfile />
                </Route>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
