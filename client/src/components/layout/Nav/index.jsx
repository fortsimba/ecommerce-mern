import React from "react";
import { StyledNav } from "./styles";

const Nav = () => {
    return (
        <StyledNav>
            <StyledNav.Brand href="/">
                <div class="row">
                  <img alt="" src="/logo192.png" width="60" height="60" className="d-inline-block align-top" />
                  <p style={{ fontSize: 35 }}>Generic Clothing Store</p>
                </div>
            </StyledNav.Brand>
        </StyledNav>
    );
};

export default Nav;
