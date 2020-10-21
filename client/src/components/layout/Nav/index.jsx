import React, { useState } from "react";
import { StyledNav } from "./styles";
import SignupLoginModal from "../SignupLoginModal";
import { LoginButton } from "./styles";
import { NavDropdown } from "react-bootstrap";
import axios from "axios";
import "./styles.css";

const Nav = () => {
  const [show, setShow] = useState(false);
  const Dropdown = () => (
    <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
      <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
      <NavDropdown.Item href="/wishlist">Wishlist</NavDropdown.Item>
      <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        onClick={() => {
          localStorage.setItem("token", "");
          axios.get("/api/auth/logout").catch((err) => console.log(err));
          window.location.reload(false);
        }}
      >
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
  return (
    <StyledNav className="nav_edits">
      <StyledNav.Brand className="mr-auto" href="/">
        <h1>EYEKEA</h1>
        <p id="subtitle">
          <i>We prioritize your comfort.</i>
        </p>
      </StyledNav.Brand>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <LoginButton size="lg" className="mr-auto" href="/landing">
            View Products
          </LoginButton>
        </li>

        <li className="nav-item">
          <LoginButton size="lg" className="ml-auto" href="/cart">
            Cart
          </LoginButton>
        </li>
        <li className="nav-item">
          {(() => {
            if (localStorage.getItem("token") === "") {
              return (
                <LoginButton
                  className="ml-auto"
                  size="lg"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Login/Signup{" "}
                </LoginButton>
              );
            } else {
              return <Dropdown className="ml-auto" />;
            }
          })()}
          <SignupLoginModal show={show} setShow={setShow} />
        </li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
