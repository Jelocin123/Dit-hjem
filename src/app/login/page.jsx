"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import { useUserContext } from "../providers/userProvider";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";

const Page = () => {

  const [loginInfo, setLoginInfo] = useState({});
  const [error, setError] = useState(null);
  const router = useRouter();
  const { handleLogin } = useUserContext();

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setLoginInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const success = await handleLogin(loginInfo);
    if (success) {
      router.push("/admin");
    } else {
      setError("Login fejlede. Prøv igen");
    }
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
    <Navbar/>

    <div className="container mt-5" id={styles.loginContainer}>

<div className="row justify-content-center">
          <div className="col-md-4">
            <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
              <h1>Login</h1>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" name="email" autoComplete="Email Address" placeholder="Email Address"/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" name="password" autoComplete="current-password" placeholder="Password"/>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary mb-5">
                Login
              </button>
            </form>
          </div>
        </div>
    </div>
    </>
  );
};

export default Page;
