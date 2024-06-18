import React, { useEffect, useState } from "react";
import axios from "axios";
import LogOut from "../logOut/logOut";
import Alert from "../alert/notify";
import Message from "../message/message";
import BookExchange from "../BookExchange/bookExchange";

interface Props {
  avatar?: string;
  logOutVisible?: string;
}

const Header = ({ avatar, logOutVisible }: Props) => {
  const [sessionData, setSessionData] = useState<{
    Role: string;
    AccountID: string;
    Name: string;
  } | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5038/api/session", { withCredentials: true })
      .then((response) => {
        if (response.data.sessionData) {
          setSessionData(response.data.sessionData);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="header d-flex justify-content-between">
      <div className="logo">
        <a href="/">
          <img src="/images/site/logo.jpg" alt="Site Logo" />
        </a>
      </div>
      <div className="d-flex align-items-center me-4">
        {sessionData ? (
          <>
            <div
              className={`avatarContain rounded-circle overflow-hidden me-1 ${avatar}`}
            >
              <a href="/personal-page" title="Trang cá nhân">
                <img
                  className=""
                  src={`/public/images/users/avt${sessionData.AccountID}.jpg`}
                  alt={`${sessionData.Name}'s Avatar`}
                />
              </a>
            </div>
            <BookExchange />
            <Message />
            <Alert />
            <LogOut logOutVisible = {logOutVisible} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Header;
