import providerData from "../../data/providerData";
import { Col } from "react-bootstrap";
import React from "react";
import axios from "axios";

import { ImageDiv, ColoredDiv, MarginedRow } from "./styles.js";

const DelegatedAuthButton = ({ img, href, color }) => {
    return (
        <Col xs={2} onClick={function glogin(){
                  window.open('http://localhost:5000/api/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
                  let listener = window.addEventListener('message', (message) => {
                    localStorage.setItem('token',message.data.user);
                    window.location.reload(false);
                  });
        }} style={{ padding: "5px" }}>
            <ColoredDiv color={color}>
                <ImageDiv img={img} color={color} />
            </ColoredDiv>
        </Col>
    );
};

const DelegatedAuthList = () => {
    return (
        <MarginedRow>
            {providerData.map(provider => {
                return <DelegatedAuthButton {...provider} key={provider.name} />;
            })}
        </MarginedRow>
    );
};

export default DelegatedAuthList;
