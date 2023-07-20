import { Layout } from "./../components/Layout";
import axios from "axios";
import React, { useEffect } from "react";

const Homepage = () => {
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/auth/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
};

export default Homepage;
