import React, { useEffect, useState } from "react";
import axios from "axios";
import LogOut from "../../components/logOut/logOut";
import "../home/home.css";
import Header from "../../components/header/header";

// Get current date and time in desired format
const formattedDateTime: string = new Date()
  .toISOString()
  .replace(/[-T:\.Z]/g, "");

const Home = () => {
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
  }, []);

  return (
    <>
      <Header />
    </>
  );
};

export default Home;
