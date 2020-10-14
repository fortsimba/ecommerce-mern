import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./components/layout/profile";
import About from "./components/layout/about";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
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
                    <Profile />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
