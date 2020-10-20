import React, {useState} from "react";
import { StyledNav } from "./styles";
import SignupLoginModal from '../SignupLoginModal';
import {LoginButton} from "./styles";
import {NavDropdown} from "react-bootstrap";
import axios from "axios"

const Nav = () => {
    const [show, setShow] = useState(false);
    const Dropdown = () => (
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
        <NavDropdown.Item href="/wishlist">Wishlist</NavDropdown.Item>
        <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => {localStorage.setItem('token', "");axios.get("/api/auth/logout").catch(err => console.log(err)); window.location.reload(false);}}>Logout</NavDropdown.Item>
      </NavDropdown>
    )
    return (
        <StyledNav>
            <LoginButton size="lg" className="mr-auto" href="/landing">View Products</LoginButton>
            <StyledNav.Brand className="mr-auto" href="/">
                <h1>EYEKEA</h1>
                <p>We prioritize your comfort.</p>
            </StyledNav.Brand>
            <LoginButton size="lg" className="ml-auto" href="/cart">Cart</LoginButton>
              {(() => {
                  if(localStorage.getItem("token")==="") {
                   return <LoginButton className="ml-auto" size="lg" onClick={() => {setShow(true)}}>Login/Signup{" "}</LoginButton>;
                 } else {
                   return <Dropdown className="ml-auto" />;
                 }
              })()}
            <SignupLoginModal show={show} setShow={setShow} />
        </StyledNav>
    );
};

export default Nav;
