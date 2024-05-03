"use client"
import React, { Fragment, useEffect, useState } from 'react';
import useRequestData from '../hooks/useRequestData';
import Loader from '../components/Loader';
import Error from '../components/Error';
import styles from './galleri.module.scss';
import Banner from '../../../public/assets/banner.jpg';
import Image from 'next/image';
import Modal from './component/Modal';
import Navbar from '../components/navbar/Navbar';

const Page = () => {
  const { data, error, makeRequest } = useRequestData();
  const [loadingInProgress, setLoadingInProgress] = useState(true);

  useEffect(() => {
    makeRequest('http://localhost:5333/estate');
    handleLoadChange();
  }, []);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
})

  const handleLoadChange = () => {
    setLoadingInProgress(true);
    setTimeout(() => {
      setLoadingInProgress(false);
    }, 500);
  };

  return (
    <>
    <Navbar/>
    <div className="container-fluid p-0" id={styles.galleriContainer}>
      <div className={styles.bannerContainer}>
        <div className="container">
          <div className={styles.overlayText}>Galleri</div>
        </div>
        <Image src={Banner} alt="Banner" className="img-fluid" id={styles.banner} />
      </div>

      <div className="container mt-5 mb-5">
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
            <article className="row m-0" id={styles.galleriInnerContainer}>
              {data.map((item, idx) => (
                <Fragment key={idx}>
                  <section className="col-12 col-md-6 col-lg-4 col-xl-4  p-3">
                    <div className={styles.imgContainer}>
                      <Image
                        className="img-fluid"
                        src={`http://localhost:5333/images/property/` + item.image}
                        width={1000}
                        height={1000}
                        alt={item.address}
                        id={styles.imgSelf}
                      />
                      <Modal/>
                      <div className={styles.imgOverlay}></div>
                    </div>
                  </section>
                </Fragment>
              ))}
            </article>
            
          </>
        )}
      </div>

    </div>
    </>
  );
};

export default Page;
