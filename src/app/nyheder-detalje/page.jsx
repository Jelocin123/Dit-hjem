"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useRequestData from "../hooks/useRequestData";
import Banner from "../../../public/assets/banner.jpg";
import Image from "next/image";
import Loader from "../components/Loader";
import styles from "./newsDetail.module.scss";
import Error from "../components/Error";
import Navbar from "../components/navbar/Navbar";
import { useUserContext } from "../providers/userProvider";
import Link from "next/link";

const page = ({ searchParams }) => {
  const { data, error, makeRequest } = useRequestData();
  const id = searchParams.id;
  const router = useRouter();
  const [loadingInProgress, setLoadingInProgress] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    if (id) {
      makeRequest(`http://localhost:5333/news/${id}`);
      handleLoadChange();
    }
  }, [id]);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  });

  const handleLoadChange = () => {
    setLoadingInProgress(true);
    setTimeout(() => {
      setLoadingInProgress(false);
    }, 500);
  };

  const formatDate = (received) => {
    const date = new Date(received);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}, ${day}, ${year}`;
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid  p-0" id={styles.newsDetailContainer}>
        <div className={styles.bannerContainer}>
          <div className="container">
            <div className={styles.overlayText}>Sidste nyt</div>
          </div>
          <Image
            src={Banner}
            alt="Banner"
            className="img-fluid"
            id={styles.banner}
          />
        </div>

        <div className="container">
          {loadingInProgress ? (
            <>
              <div className="container " id={styles.loader}>
                <div className={styles.wrapper}>
                  <Loader />
                </div>
              </div>
            </>
          ) : error ? (
            <Error />
          ) : (
            <>
              <article className="row m-0 mt-5 justify-content-center ">
                <section className="col-9 mb-5 p-0 position-relative ">
                  <div
                    className=" p-2 p-md-2 p-lg-4 p-xl-4"
                    id={styles.blueOverlay}
                  >
                    <h6 className="mb-3">{data.title}</h6>
                    <p className="mb-0" id={styles.date}>
                      {formatDate(data.received)}
                    </p>
                  </div>
                  <Image
                    className="img-fluid"
                    src={`http://localhost:5333/images/news/` + data.image}
                    width={1000}
                    height={1000}
                    alt="News"
                  />
                  <section className="col-12" id={styles.imageText}>
                    <p className="mt-4">{data.content}</p>

                   
                  </section>
                  {user && (
                      <Link
                        className="text-center"
                        href={{
                          pathname: "/admin/ret-nyhed",
                          query: { id:data._id },
                        }}
                      >
                        <button
                          
                          className="btn btn-primary  col-12 mt-2"
                        >
                          <i className="fa-solid fa-pen-to-square "></i>
                        </button>
                      </Link>
                    )}
                </section>
              </article>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
