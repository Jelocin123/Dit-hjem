"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/assets/logo-2.png";
import styles from "../../styles/navbar.module.scss";
import useRequestData from "@/app/hooks/useRequestData";
import SvgPhone from "../svgComponents/SvgPhone";
import NyhedModal from "./NyhedModal";
import { useUserContext } from "@/app/providers/userProvider";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    makeRequest("http://localhost:5333/contactinformation");
  }, []);

  const phoneNumber = data?.phone;
  const formattedPhoneNumber = `${phoneNumber?.slice(
    0,
    2
  )} ${phoneNumber?.slice(2, 4)} ${phoneNumber?.slice(
    4,
    6
  )} ${phoneNumber?.slice(6, 8)} ${phoneNumber?.slice(8)}`;

  useEffect(() => {
    const storedActive = localStorage.getItem("activeLink");
    if (storedActive) {
      setActive(storedActive);
    }
  }, []);

  const handleActiveClick = (link) => {
    setActive(link);
    localStorage.setItem("activeLink", link);
  };

  const toggleOverlay = () => {
    setTimeout(() => {
      setOverlayVisible(!overlayVisible);
    }, 0);
  };

  useEffect(() => {
    const isBoligDetalje = window.location.href.includes("bolig-detalje");
    const isAdmin = window.location.href.includes("admin")

    if (isBoligDetalje) {
      setActive("boliger");
    }

    if (isAdmin) {
      setActive("admin")
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg pt-0">
        <div className="container " id={styles.navbarContainer}>
          <button
            className="navbar-toggler col-12 d-lg-none  border-0  ps-0 pt-0 pb-0  text-start d-flex justify-content-between align-items-center"
            id={styles.navbarBurger}
          >
            <div
              className={styles.zBtn}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {overlayVisible ? (
                <div className="col-3">
                  <span
                    className="fa-solid p-2 pt-2 ps-3 pe-3 fa-x"
                    onClick={toggleOverlay}
                    id={styles.navbarIconClose}
                  ></span>
                </div>
              ) : (
                <span
                  className="fa-solid p-2 pt-2 ps-3 pe-3 fa-bars"
                  onClick={toggleOverlay}
                  id={styles.navbarIcon}
                ></span>
              )}
            </div>
            <div className="text-white" id={styles.navbarNumber}>
              {!isLoading && phoneNumber && (
                <>
                  <SvgPhone className="me-1" />
                  +45 {formattedPhoneNumber}
                </>
              )}
            </div>
          </button>

          <Link
            className="navbar-brand pb-0 mx-auto mx-md-0 mx-lg-0 mx-xl-0 "
            href={"/"}
            onClick={() => handleActiveClick("home")}
          >
            <Image className="img-fluid " src={Logo} alt="Logo" />
            <small className="d-flex mt-1">Din mælger - dit hjem</small>
          </Link>

          <div
            className={`overlay p-0 ${overlayVisible ? "active" : ""}`}
          ></div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="container p-0" id={styles.contact}>
              <article className="row" id={styles.contactRow}>
                {!isLoading && phoneNumber && (
                  <span
                    className="col-3 ms-5 text-center mt-3"
                    id={styles.phoneNumberNone}
                  >
                    +45 {formattedPhoneNumber}
                  </span>
                )}
                <section className="col-3 ps-5 ps-lg-0 ms-auto pe-0 mt-lg-0 text-nowrap">
                  <NyhedModal />
                  <i
                    className="fa-brands fa-twitter  p-3"
                    id={styles.twitterIcon}
                  ></i>
                  <i
                    className="fa-brands fa-facebook-f p-3  text-center"
                    id={styles.facebookIcon}
                  ></i>
                </section>
                <article className="row justify-content-end p-0 m-0 d-flex">
                  <hr />
                </article>
              </article>
            </div>
            <ul className="navbar-nav ms-auto me-0 me-md-0 me-lg-5 me-xl-5">
              <li className="nav-item">
                <Link
                  className={`nav-link ms-3 ms-md-3 ms-lg-0 ms-xl-0 mt-2 mt-md-2 mt-lg-0 mt-xl-0 ${
                    active === "home" ? "active" : ""
                  }`}
                  onClick={() => handleActiveClick("home")}
                  aria-current="page"
                  href="/"
                >
                  Hjem
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ms-3 ms-md-3 ms-lg-0 ms-xl-0  mt-2 mt-md-2 mt-lg-0 mt-xl-0 ${
                    active === "boliger" ? "active" : ""
                  }`}
                  onClick={() => handleActiveClick("boliger")}
                  href="/boliger"
                >
                  Boliger
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ms-3 ms-md-3 ms-lg-0 ms-xl-0 mt-2 mt-md-2 mt-lg-0 mt-xl-0 ${
                    active === "nyheder" ? "active" : ""
                  }`}
                  onClick={() => handleActiveClick("nyheder")}
                  href="/nyheder"
                >
                  Nyheder
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ms-3 ms-md-3 ms-lg-0 ms-xl-0 mt-2 mt-md-2 mt-lg-0 mt-xl-0 ${
                    active === "mælgere" ? "active" : ""
                  }`}
                  onClick={() => handleActiveClick("mælgere")}
                  href="/vores-maeglere"
                >
                  Mæglere
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ms-3 ms-md-3 ms-lg-0 ms-xl-0 mt-2 mt-md-2 mt-lg-0 mt-xl-0 ${
                    active === "galleri" ? "active" : ""
                  }`}
                  onClick={() => handleActiveClick("galleri")}
                  href="/galleri"
                >
                  Galleri
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ms-3 ms-md-3 ms-lg-0 ms-xl-0 mt-2 mt-md-2 mt-lg-0 mt-xl-0 ${
                    active === "kontakt" ? "active" : ""
                  }`}
                  onClick={() => handleActiveClick("kontakt")}
                  href="/kontakt"
                >
                  Kontakt
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <>
                    <Link
                      className={`nav-link ms-3 ms-md-3 ms-lg-0 ms-xl-0 mt-2 mt-md-2 mt-lg-0 mt-xl-0 ${
                        active === "admin" ? "active" : ""
                      }`}
                      onClick={() => handleActiveClick("admin")}
                      href="/admin"
                    >
                      <i className="fa-solid fa-user"></i>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className={`nav-link ms-3 ms-md-3 ms-lg-0 ms-xl-0 mt-2 mt-md-2 mt-lg-0 mt-xl-0 ${
                        active === "login" ? "active" : ""
                      }`}
                      onClick={() => handleActiveClick("login")}
                      href="/login"
                    >
                      Login
                    </Link>
                  </>
                )}
              </li>
              <hr className="mt-1 mb-0 d-lg-none" />
              <article className="row m-0 justify-content-center mb-4 mt-4 d-lg-none">
                <Link className="col-1" href={"https://www.twitter.com"}>
                  <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link className="col-1" href={"https://www.facebook.com"}>
                  <i className="fa-brands fa-facebook-f "></i>
                </Link>
                <Link className="col-1" href={"https://gmail.com"}>
                  <i className="fa-brands fa-google "></i>
                </Link>
              </article>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
