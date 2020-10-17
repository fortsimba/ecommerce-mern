import React, {useState} from "react";
import { StyledNav } from "./styles";
import SignupLoginModal from '../SignupLoginModal';
import { Row } from "react-bootstrap";
import {LoginButton} from "./styles";

const Nav = () => {
    const [show, setShow] = useState(false);
    return (
        <StyledNav>
            <StyledNav.Brand className="ml-auto" href="/">
                <h1>EYEKEA</h1>
                <p>We prioritize your comfort.</p>
            </StyledNav.Brand>
              {(() => {
                  if(localStorage.getItem("token")==="") {
                   return <LoginButton className="ml-auto" size="lg" onClick={() => {
                      setShow(true)
                   }}>Login/Signup{" "}</LoginButton>;
                 } else {
                   return <LoginButton className="ml-auto" size="lg" onClick={() => {
                     localStorage.setItem('token', "");
                     window.location.reload(false);}
                   }>Logout {localStorage.getItem('token')}</LoginButton>;
                 }
              })()}
            <SignupLoginModal show={show} setShow={setShow} />
        </StyledNav>
    );
};

export default Nav;
