import { Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styled from "styled-components";

export const StyledNav = styled(Navbar)`
  -webkit-box-shadow: 0 24px 38px 3px #f7f7f72e, 0 9px 46px 8px #ffffff2b,
    0 11px 15px -7px #ffffff45;
  box-shadow: 0 24px 38px 3px #f7f7f72e, 0 9px 46px 8px #ffffff2b,
    0 11px 15px -7px #ffffff45;
  border-bottom: 2px solid lightgrey;
`;

export const LoginButton = styled(Button)`
  background: #114b74;
  color: #fff;
  border-radius: 3px;
  padding: 5px 10px;

  border-color: white;
  &:hover {
    background: #41aea9;
    border-color: white;
    -webkit-box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  }
`;

// -webkit-box-shadow: 0 24px 38px 3px #f7f7f72e, 0 9px 46px 8px #ffffff2b,
//     0 11px 15px -7px #ffffff45;
//   box-shadow: 0 24px 38px 3px #f7f7f72e, 0 9px 46px 8px #ffffff2b,
//     0 11px 15px -7px #ffffff45;
