import React, { useEffect, useState } from "react";
import axios from "axios";
import "../home/home.css";

// Get current date and time in desired format
const formattedDateTime: string = new Date()
  .toISOString()
  .replace(/[-T:\.Z]/g, "");

const Home = () => {
  const [sessionData, setSessionData] = useState<{ Role: string, AccountID: string, Name: string } | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5038/api/session', { withCredentials: true })
        .then(response => {
            if (response.data.sessionData) {
                setSessionData(response.data.sessionData);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }, []);

  return (
    <>
      <div className="header d-flex justify-content-between">
        <div className="logo">
          <img src="/images/site/logo.jpg" alt="Site Logo" />
        </div>
        <div className="d-flex align-items-center">
          <div className="avatarContain rounded-circle overflow-hidden me-3">
            <img className="" src="/public/images/users/avt_user3.jpg" alt="" />
          </div>
          <div className="">{formattedDateTime}</div>
        </div>
      </div>
      <div>
        <h1>Session Data:</h1>
        {sessionData ? (
          <div>
            <p>Role: {sessionData.Role}</p>
            <p>AccountID: {sessionData.AccountID}</p>
            <p>Name: {sessionData.Name}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Home;
