import React from "react";

const Profile = () => {
  return (
    <div>
      <ul>
        <li>
          <a href="/update_profile">
            <button className="btn btn-info">Update Profile</button>
          </a>
        </li>
        <hr />
        <li>
          <a href="/cart">
            <button className="btn btn-info">My Cart</button>
          </a>
        </li>
        <hr />
        <li>
          <a href="/orders">
            <button className="btn btn-info">My Orders</button>
          </a>
        </li>
        <hr />
        <li>
          <a href="/wishlist">
            <button className="btn btn-info">My Wishlist</button>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
