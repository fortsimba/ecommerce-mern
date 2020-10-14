import React, { useState } from "react";
import SignupLoginModal from '../SignupLoginModal';
import {LoginButton} from "./styles";

const Profile = () => {
    const [show, setShow] = useState(false);
    var name = "Logout "+localStorage.getItem('token');
    return (
        <div>
            Profile component
            {(() => {
                if(localStorage.getItem("token")==="") {
                 return <LoginButton size="lg" onClick={() => setShow(true)}>Login/Signup{" "}</LoginButton>;
               } else {
                 return <LoginButton size="lg" onClick={() => localStorage.setItem('token', "")}>Logout {localStorage.getItem('token')}</LoginButton>;
               }
            })()}
            <SignupLoginModal show={show} setShow={setShow} />
        </div>
    );
}

export default Profile;
