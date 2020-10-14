import styled from "styled-components";
import { Col, Row, Button } from "react-bootstrap";

export const LoginButton = styled(Button)`
    background: #114b74;
    float: right;
    color: #fff;
    border-radius: 3px;
    padding: 5px 10px;
    margin: auto;
    -webkit-box-shadow: 0 24px 38px 3px #f7f7f72e, 0 9px 46px 8px #ffffff2b, 0 11px 15px -7px #ffffff45;
    box-shadow: 0 24px 38px 3px #f7f7f72e, 0 9px 46px 8px #ffffff2b, 0 11px 15px -7px #ffffff45;
    border-color: white;
    &:hover {
        background: #1b791e;
        border-color: white;
        -webkit-box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
            0 11px 15px -7px rgba(0, 0, 0, 0.2);
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
            0 11px 15px -7px rgba(0, 0, 0, 0.2);
    }
`;
