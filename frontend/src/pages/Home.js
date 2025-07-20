import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import axiosClient from "../api/axiosClient";

const Home = () => {
  const { token } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      axiosClient(token).get("/api/protected/")
        .then(res => setMessage(res.data.message))
        .catch(err => setMessage("Access denied"));
    }
  }, [token]);

  return <h1>{message || "Loading..."}</h1>;
};

export default Home;
