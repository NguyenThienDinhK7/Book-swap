import React from "react";
import "./personalPage.css";
import LogOut from "../../components/logOut/logOut";
import Header from "../../components/header/header";

const PersonalPage = () => {
  return (
    <>
      <Header avatar="d-none" />

      <div className="d-flex justify-content-center container mt-3 p-3 rounded">
        <div className="profile-header position-relative">
          <div className="cover-photo">
            <img
              src="/images/users/cov666fdb519bcdc003a1b7e81c.jpg"
              alt="Cover"
              className="img-fluid w-100 h-100"
            />
          </div>
          <div className="avatar-container">
            <img
              src="/images/users/avt666fdb519bcdc003a1b7e81c.jpg"
              alt="Avatar"
              className="rounded-circle"
            />
          </div>
          <div className="profile-name">
            <h2 className="text-white mt-3">John Doe</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalPage;
