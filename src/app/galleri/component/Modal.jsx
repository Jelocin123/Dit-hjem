"use client"
import React, { useEffect, useState, useRef } from "react";
import styles from "../galleri.module.scss";
import useRequestData from "@/app/hooks/useRequestData";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import stylesTwo from "./modal.module.scss";

const Modal = () => {
  const { data, error, makeRequest } = useRequestData();
  const sliderRef = useRef(null); 

  useEffect(() => {
    makeRequest("http://localhost:5333/estate");
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleNext = () => {
    sliderRef.current.slickNext(); 
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev(); 
  };

  return (
    <>
      <div className={styles.iconContainer}>
        <button
          type="button"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#galleriModal"
        >
          <i className="fa-solid fa-magnifying-glass-plus"></i>
        </button>
      </div>

      <div
        className="modal fade"
        id="galleriModal"
        tabIndex="-1"
        aria-labelledby="galleriModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen container p-0">
          <div className="modal-content" id={stylesTwo.modalContainer}>
            <div className="modal-header bg-black border-0">
              <h5 className="modal-title mx-auto">Photo</h5>
              <button
                type="button"
                className="text-white btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="modal-body row justify-content-center p-0" id={stylesTwo.modalBody}>
              <Slider {...sliderSettings} ref={sliderRef} className="col-7">
                {data &&
                  data?.map((item, idx) => (
                    <div key={idx} >
                      <Image
                        src={`http://localhost:5333/images/property/` + item.image}
                        width={1000}
                        height={1000}
                        alt={item.address}
                        className="img-fluid"
                      />
                    </div>
                  ))}
              </Slider>
              
            </div>
            <div className="row  bg-black">
              <button className="btn  col-1 " onClick={handlePrev} id={stylesTwo.prev}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button className="btn  col-1  ms-auto" onClick={handleNext} id={stylesTwo.next}>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
