import React from "react";
import "./personalPage.css";
import LogOut from "../../components/logOut/logOut";
import Header from "../../components/header/header";

const PersonalPage = () => {
  return (
    <>
      <Header avatar="d-none" />

      <div className="d-flex justify-content-center">
        <div className="cover_photo_wrapper w-75 bg-dark position-relative">
          <div className="cover_photo bg-danger">
            <img
              src="/public/images/users/avt666fdb519bcdc003a1b7e81c.jpg"
              alt=""
            />
          </div>
          <div className="avatar position-absolute top-50 start-50 translate-middle">
            <img
              src="/public/images/users/avt666fdb519bcdc003a1b7e81c.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalPage;
