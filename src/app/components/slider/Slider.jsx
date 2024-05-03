"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useRequestData from '@/app/hooks/useRequestData';
import styles from "../../styles/slider.module.scss";
import SliderLoader from '../SliderLoader';
import Error from '../Error';
import SvgArrowLeft from '../svgComponents/SvgArrowLeft';
import SvgArrowRight from '../svgComponents/SvgArrowRight';

const Slider = () => {
    const { data, error, makeRequest } = useRequestData();
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loadingInProgress, setLoadingInProgress] = useState(true);

    useEffect(() => {
        makeRequest("http://localhost:5333/slider");
        handleLoadChange();
    }, []);

    const handleLoadChange = () => {
        setLoadingInProgress(true);
        setTimeout(() => {
          setLoadingInProgress(false);
        }, 500);
    };

    useEffect(() => {
        if (data && data.length > 0) {
            setImages(data);
        }
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    const handlePrevButtonClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextButtonClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <article className="row m-0 position-relative" id={styles.sliderContainer}>
            {loadingInProgress ? (
                <div className="container" id={styles.loader}>
                    <div className={styles.wrapper}>
                        <SliderLoader />
                    </div>
                </div>
            ) : error ? (
                <Error />
            ) : (
                <section className={`${styles.slider} col-12 p-0`}>
                    {images.map((item, index) => (
                        <div
                            key={index}
                            className={`position-absolute ${styles.imageWrapper}`}
                            style={{ zIndex: index === currentImageIndex ? 2 : 1, opacity: index === currentImageIndex ? 1 : 0 }}
                        >
                            <Image
                                src={"http://localhost:5333/images/slider/" + item.image}
                                alt={`Image ${index}`}
                                className={`img-fluid`}
                                width={2560}
                                height={1000}
                            />
                        </div>
                    ))}
                    <div className={`container ps-0 z-3 ${styles.overlay}`}>
                        <span className={`${styles.overlayText}`}>Søg</span>
                    </div>
                    <div id={styles.buttonHover}>
                    <div className={`${styles.arrowLeft} ${currentImageIndex === 0 ? styles.hidden : ''}`} onClick={handlePrevButtonClick}>
                        <SvgArrowLeft />
                    </div>
                    </div>
                    <div id={styles.buttonHover}>
                    <div className={`${styles.arrowRight} ${currentImageIndex === images.length - 1 ? styles.hidden : ''}`} onClick={handleNextButtonClick}>
                        <SvgArrowRight />
                    </div>
                    </div>
                </section>
            )}
        </article>
    );
};

export default Slider;
