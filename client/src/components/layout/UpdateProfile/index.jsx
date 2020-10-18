import React, {useState} from "react";
import axios from "axios";
const UpdateProfile = () => {
    const user = localStorage.getItem('token');
    axios.get("/api/profile_import", {params: {uid: user}}).then((res) => {
      console.log(res.data);
    });
    return (
      <p> hello! </p>
    );
};

export default UpdateProfile;
