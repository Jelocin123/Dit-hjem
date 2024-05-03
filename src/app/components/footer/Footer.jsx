"use client";
import React, { Fragment, useEffect, useState } from "react";
import styles from "../../styles/footer.module.scss";
import FooterLogo from "../../../../public/assets/footer-logo.png";
import useRequestData from "@/app/hooks/useRequestData";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    const { data, isLoading, error, makeRequest } = useRequestData();
    const [areaCounts, setAreaCounts] = useState({});
    const [totalHousesForSale, setTotalHousesForSale] = useState(0);
  
    useEffect(() => {
      makeRequest("http://localhost:5333/estate");
    }, []);
  
    useEffect(() => {
      if (data) {
        const counts = {};
        let total = 0;
        data.forEach((item) => {
          counts[item.area] = (counts[item.area] || 0) + 1;
          total++;
        });
        setAreaCounts(counts);
        setTotalHousesForSale(total);
      }
    }, [data]);
  
    return (
      <div  id={styles.footerContainer}>
        <div className="container">
          <article className="row pt-5 pb-5">
            <section className="col-12 col-md-4 col-lg-4 col-xl-3">
              <Image src={FooterLogo} alt="Footer logo" />
              <p id={styles.copyRightP} className="mt-3">
                &copy; Copyright 2023 All rights reserved
                <br className="d-md-block d-lg-block d-xl-block d-none " /> by <span>Dit hjem</span>
              </p>
            </section>
            <section className="col-12 col-md-3 col-lg-2 col-xl-2">
              <h6 className="mb-4 mt-3 mt-md-0 mt-lg-0 mt-xl-0">Områder</h6>
              <ul className="ps-0">
                {Object.entries(areaCounts).map(([area, count], idx) => (
                  <Fragment key={idx}>
                    <li className={idx > 0 ? "ps-3" : ""}>
                      <Link href={"/"}>
                        {area} <span>({count})</span>
                      </Link>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </section>
            <section className="col-12 col-md-3 col-lg-2 col-xl-2 ms-auto">
              <h6 className="mb-4 ">Boliger til salg</h6>
              <Link href={"/"}>
                Til salg <span>({totalHousesForSale})</span>
              </Link>
              
            </section>
            <section className="col-12 col-md-2 col-lg-2 col-xl-2 p-md-0 ms-auto">
              <h6 className="mb-4 mt-4 mt-md-0 mt-lg-0 mt-xl-0 ">Find os også her</h6>
                <Link href={"/"}>
                <i className="fa-brands fa-twitter "></i>
                </Link>
                <Link href={"/"}>
                <i className="fa-brands fa-facebook-f  ms-3" ></i>
                </Link>
            </section>
          </article>
        </div>
      </div>
    );
  };
  
  export default Footer;
  