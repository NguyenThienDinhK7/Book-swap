import React, { useEffect, useState } from "react";
import axios from "axios";
import "../home/home.css";

// Get current date and time in desired format
const formattedDateTime: string = new Date()
  .toISOString()
  .replace(/[-T:\.Z]/g, "");

const Home = () => {
  const [views, setViews] = useState<number | null>(null);
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;

  useEffect(() => {
    axios.get('http://localhost:5038/api/session', { withCredentials: true })
        .then(response => {
            setViews(response.data.views);
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
        <h1>Session Views: {views}|</h1>
      </div>
    </>
  );
};

export default Home;
