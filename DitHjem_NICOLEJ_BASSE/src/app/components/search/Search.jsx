"use client"
import React, { Fragment, useEffect, useState } from "react";
import useRequestData from "@/app/hooks/useRequestData";
import styles from "../../styles/search.module.scss";

const Search = () => {
  const { data, makeRequest } = useRequestData();
  const [selectedArea, setSelectedArea] = useState("Område (Alle)");
  const [selectedPriceFrom, setSelectedPriceFrom] = useState("Pris fra (Alle)");
  const [selectedPriceTo, setSelectedPriceTo] = useState("Pris til (Alle)")


  useEffect(() => {
    makeRequest("http://localhost:5333/estate");
  }, []);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  
    const searchInput = document.querySelectorAll(".dropdown input");
    searchInput.forEach(input => {
      input.addEventListener("input", function () {
        const filter = this.value.toLowerCase();
        const dropdownItems = this.closest('.dropdown').querySelectorAll(".dropdown-menu a.dropdown-item");
        const hrTags = this.closest('.dropdown').querySelectorAll(".dropdown-menu .dropdown-divider");
  
        for (let i = 0; i < dropdownItems.length; i++) {
          const item = dropdownItems[i];
          const hrTag = hrTags[i];
          const text = item.textContent.toLowerCase();
          if (text.includes(filter)) {
            item.style.display = "";
            hrTag.style.display = "";
          } else {
            item.style.display = "none";
            hrTag.style.display = "none";
          }
        }
      });
    });
  }, []);
  

  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  const handlePriceFromClick = (priceFrom) => {

    setSelectedPriceFrom(priceFrom)

  }

  const handlePriceToClick = (priceTo) => {
    setSelectedPriceTo(priceTo)
  }

  const uniqueAreas = [...new Set(data?.map((item) => item.area))];

  const priceOptions = [
    50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000,
    1000000, 1500000, 2000000, 2500000, 5000000, 7500000, 10000000
  ];

  return (
    <div className="container-fluid" id={styles.searchContainer}>
      <div className="container">
        
        <article className="row pt-4 pb-4">
          <section className="col-12 col-md-3 col-lg-3 col-xl-3 dropdown  p-0 pe-0 pe-md-2 pe-lg-2 pe-xl-2">
            <button
              className="btn dropdown-toggle col-12"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              {selectedArea}
            </button>
            <ul className={`dropdown-menu col-12 pt-0 ${styles.dropdownMenu}`} id={styles.dropdownHeight}>
              <li>
                <input
                  className="dropdown-item  pt-2 pb-2"
                  type="text"
                  placeholder="Search..."
                />
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              <li>
                <a className="dropdown-item pt-2 pb-2" onClick={() => handleAreaClick("Område (Alle)")}>
                  Område (Alle)
                </a>
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              {uniqueAreas.map((area, idx) => (
                <Fragment key={idx}>
                  <li>
                    <a className="dropdown-item pt-2 pb-2" onClick={() => handleAreaClick(area)}>
                      {area}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider m-0" />
                  </li>
                </Fragment>
              ))}
            </ul>
          </section>
          <section className="col-12 col-md-3 col-lg-3 col-xl-3 dropdown  p-0  mt-2 mt-md-0 mt-lg-0 mt-xl-0 pe-0 pe-md-2 pe-lg-2 pe-xl-2">
            <button
              className="btn btn-secondary dropdown-toggle col-12"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
             {selectedPriceFrom.toLocaleString("en-US")}
            </button>
            <ul className={`dropdown-menu col-12 pt-0 ${styles.dropdownMenu}`} id={styles.dropdownHeight}>
              <li>
                <input
                  className="dropdown-item pt-2 pb-2"
                  type="number"
                  placeholder="Search..."
                />
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              <li>
                <a className="dropdown-item pt-2 pb-2" onClick={() => handlePriceFromClick("Pris fra (Alle)")}>
                  Pris fra (Alle)
                </a>
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              {priceOptions.map((price, idx) => (
                <Fragment key={idx}>
                  <li key={idx}>
                    <a className="dropdown-item pt-2 pb-2" onClick={() => handlePriceFromClick(price)}>
                      {price.toLocaleString("en-US")}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider m-0" />
                  </li>
                </Fragment>
              ))}
            </ul>
          </section>
          <section className="col-12 col-md-3 col-lg-3 col-xl-3 dropdown p-0  mt-2 mt-md-0 mt-lg-0 mt-xl-0">
            <button
              className="btn btn-secondary dropdown-toggle col-12"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              {selectedPriceTo.toLocaleString("en-US")}
            </button>
            <ul className={`dropdown-menu col-12 pt-0 ${styles.dropdownMenu}`} id={styles.dropdownHeight}>
              <li>
                <input
                  className="dropdown-item pt-2 pb-2"
                  type="number"
                  placeholder="Search..."
                />
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              <li>
                <a className="dropdown-item pt-2 pb-2" onClick={() => handlePriceToClick("Pris til (Alle)")}>
                  Pris til (Alle)
                </a>
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              {priceOptions.map((price, idx) => (
                <Fragment key={idx}>
                  <li key={idx}>
                    <a className="dropdown-item pt-2 pb-2" onClick={() => handlePriceToClick(price)}>
                      {price.toLocaleString("en-US")}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider m-0" />
                  </li>
                </Fragment>
              ))}
            </ul>
          </section>
          <section className="col-12 mt-2 mt-md-0 mt-lg-0 mt-xl-0 col-md-3 col-lg-3 col-xl-3 ps-md-2 ps-lg-2 ps-xl-2 ps-0 pe-0">
            <button className="btn col-12" id={styles.searchBtn}>Søg</button>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Search;
