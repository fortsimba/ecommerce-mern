import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./components/layout/Profile";
import UpdateProfile from "./components/layout/UpdateProfile";
import Landing from "./components/layout/Landing";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Details from  "./components/layout/Details";
import Cart from "./components/layout/Cart";
import Wishlist from "./components/layout/Wishlist"
import Orders from "./components/layout/Orders"

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
                <Route  path="/product/:id" component={Details} />
                <Route exact path="/landing">
                    <Landing />
                </Route>
                <Route exact path="/update_profile">
                    <UpdateProfile />
                </Route>
                <Route exact path="/wishlist">
                    <Wishlist />
                </Route>
                <Route exact path="/cart">
                    <Cart />
                </Route>
                <Route exact path="/orders">
                    <Orders />
                </Route>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
