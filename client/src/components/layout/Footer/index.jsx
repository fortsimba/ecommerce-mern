import React from "react";
import { Link } from "react-router-dom";
import { StyledFooter } from "./styles";
import "./styles.css";

const Footer = () => {
  return (
    <StyledFooter sticky="bottom">
      <div style={{ float: "left" }}>
        <p id="footer_text">
          Developed by Pranay Yadav, Niwas Chadha, Payal Basu
        </p>
      </div>
    </StyledFooter>
  );
};

export default Footer;
