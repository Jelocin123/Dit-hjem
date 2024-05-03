"use client"
import React, {Fragment, useEffect, useState} from 'react'
import styles from "./maegler.module.scss"
import Loader from '../components/Loader'
import Error from '../components/Error'
import Banner from "../../../public/assets/banner.jpg"
import Image from 'next/image'
import Link from 'next/link'
import useRequestData from '../hooks/useRequestData'
import SvgMobil from '../components/svgComponents/SvgMobil'
import SvgPhone from '../components/svgComponents/SvgPhone'
import Navbar from '../components/navbar/Navbar'

const page = () => {
  const {data, error, makeRequest} = useRequestData();
  const [loadingInProgress, setLoadingInProgress] = useState(true)

  useEffect(() => {
    makeRequest("http://localhost:5333/agent");
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

    <div className='container-fluid p-0' id={styles.maeglerContainer}>
      <div className={styles.bannerContainer}>
        <div className='container'>
        <div className={styles.overlayText}>Vores mæglere</div>
        </div>
        <Image
          src={Banner}
          alt='Banner'
          className='img-fluid'
          id={styles.banner}
        />
      </div>

      <div className='container mt-5 mb-5' >
      {loadingInProgress ? (
          <>
           <div className="container " id={styles.loader}>
            <div className={styles.wrapper}>
            <Loader />
            </div>
            </div>
          </>
        ) : error ? (
          <Error/>
        ) : ( 
          <>
            <article className='row m-0' id={styles.peopleContainer}>
              {data.map((item, idx) => (
                <Fragment key={idx}>
                
                <section className='col-12 col-md-6 col-lg-3 col-xl-3'>
                  <article className='row p-4'>
                    <section className='col-6 col-md-6 col-lg-12 col-xl-6'>
                      <Image className='img-fluid' src={`http://localhost:5333/images/agent/` + item.image} width={1000} height={1000} alt={item.name}/>
                    </section>
                    <section className='col-4 col-md-4 col-lg-12 col-xl-4 mt-2'>
                      <p className={`${styles.nameP} mb-0`}>{item.name}</p>
                      <p className={`${styles.maeglerP} mb-2`}>Mægler</p>
                      <article className='row '>
                        <section className='col-12 text-nowrap '>
                        <Link href={"https://www.twitter.com"}>
                        <i className='fa-brands fa-twitter me-3'></i>
                        </Link>
                        <Link href={"https://www.facebook.com"}>
                        <i className='fa-brands fa-facebook-f'></i>
                        </Link>
                        <Link href={"https://www.linkedin.com"}>
                        <i className='fa-brands fa-linkedin-in ms-3'></i>
                        </Link>
                        </section>
                      </article>
                    </section>
                    <article className='row mt-4 '>
                      <section className='col-12 pe-0'>
                        <p className={`${styles.phoneNumber} mb-2`}>
                          <SvgPhone className="me-2" id={styles.phone}/>
                          Kontor:
                          <span className='ps-1'>{item.phone}</span>
                        </p>

                        <p className={styles.mobilNumber}>
                          <SvgMobil className="me-2" id={styles.mobil}/>
                          Mobil:
                          <span className='ps-1'>{item.phone}</span>
                        </p>
                      </section>
                    </article>
                  </article>
                </section>

               
                
                </Fragment>
              ))}
            </article>
          </>
        )}
      </div>
    </div>
    </>
  )
}

export default page