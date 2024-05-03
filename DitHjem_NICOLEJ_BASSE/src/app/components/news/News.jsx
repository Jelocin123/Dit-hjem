"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/news.module.scss";
import useRequestData from "@/app/hooks/useRequestData";
import SvgArrowLeft from "../svgComponents/SvgArrowLeft";
import SvgArrowRight from "../svgComponents/SvgArrowRight";

const News = () => {
  const { data, makeRequest } = useRequestData();
  const [newestData, setNewestData] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slidesDisplayed, setSlidesDisplayed] = useState(0);

  useEffect(() => {
    makeRequest("http://localhost:5333/news");
  }, []);

  useEffect(() => {
    if (data) {
      const sortedData = data.sort(
        (a, b) => new Date(b.received) - new Date(a.received)
      );
      const newestItems = sortedData.slice(0, 3);
      setNewestData(newestItems);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setSlidesDisplayed(1);
      } else {
        setSlidesDisplayed(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, newestData.length - slidesDisplayed)
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + ".";
  };

  return (
    <>
      <div className="container-fluid" id={styles.newsContainer}>
        <div className="container pt-5 pb-5">
          <article className="row">
            <section className="col-4 col-md-4 col-lg-2 col-xl-2 ps-3">
              <h4>Sidste nyt</h4>
            </section>

            <section className="col-4 col-md-2 col-lg-2 col-xl-2 ms-auto justify-content-end d-flex">
              <button
                className={`btn p-0 border-0 ${
                  currentSlideIndex === 0 && "disabled"
                }`}
                onClick={handlePrevSlide}
              >
                <SvgArrowLeft
                  className="p-2 pt-1 pe-1"
                  id={styles.arrowIcon1}
                />
              </button>
              <button
                className={`btn p-0 border-0 ${
                  currentSlideIndex >= newestData.length - slidesDisplayed &&
                  "disabled"
                }`}
                onClick={handleNextSlide}
              >
                <SvgArrowRight
                  className="p-2 pt-1 pe-1"
                  id={styles.arrowIcon2}
                />
              </button>
            </section>
          </article>

          <div className="row" id={styles.sliderWrapper}>
            <div
              className="p-0"
              id={styles.sliderContainer}
              style={{
                transform: `translateX(-${
                  (currentSlideIndex * 100) / slidesDisplayed
                }%)`,
              }}
            >
              {newestData.map((item, idx) => (
                <div
                  key={idx}
                  className={`col-12 col-md-6 col-lg-6 col-xl-6 ${styles.slide} ps-3 pe-3`}
                >
                  <article className="row">
                    <section
                      className="col-12 col-md-12 col-lg-6 col-xl-6"
                      id={styles.image_container}
                    >
                      <Image
                        className="img-fluid "
                        src={"http://localhost:5333/images/news/" + item.image}
                        width={1000}
                        height={1000}
                        alt="News "
                      />
                    </section>
                    <section className="col-12 col-md-12 col-lg-6 col-xl-6">
                      <Link
                        className="text-decoration-none "
                        href={{
                          pathname: "/nyheder-detalje",
                          query: { id: item._id },
                        }}
                      >
                        <h5 className="mt-1">{item.title}</h5>
                        <p
                          className="mb-md-0"
                          dangerouslySetInnerHTML={{
                            __html: truncateText(item.content, 166),
                          }}
                        ></p>
                        <span>
                          Se mere{" "}
                          <i className="fa-regular fa-circle-right ms-1"></i>
                        </span>
                      </Link>
                    </section>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
