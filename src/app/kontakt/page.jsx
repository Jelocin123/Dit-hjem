"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; 
import 'leaflet/dist/leaflet.css';
import styles from "./kontakt.module.scss";
import useRequestData from '../hooks/useRequestData';
import Image from 'next/image';
import Banner from "../../../public/assets/banner.jpg";
import SvgMobil from '../components/svgComponents/SvgMobil';
import SvgPhone from '../components/svgComponents/SvgPhone';
import SvgMail from '../components/svgComponents/SvgMail';
import SvgClock from '../components/svgComponents/SvgClock';
import Loader from '../components/Loader';
import Navbar from '../components/navbar/Navbar';
import Error from '../components/Error';
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false }); 

const Page = () => {
  const { data, error, makeRequest } = useRequestData();
  const [loadingInProgress, setLoadingInProgress] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    makeRequest("http://localhost:5333/contactinformation");
    handleLoadChange();
  }, []);

  const handleLoadChange = () => {
    setLoadingInProgress(true);
    setTimeout(() => {
      setLoadingInProgress(false);
    }, 500);
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setMessageError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError(true);
    }
    if (!email.trim()) {
      setEmailError(true);
    }
    if (!message.trim()) {
      setMessageError(true);
    }

    if (!name || !email || !message) {
      return;
    }

    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const contactInfo = {
      name,
      email,
      phone,
      message,
    };
    try {
      const response = await makeRequest(
        'http://localhost:5333/contact',
        requestOptions.headers,
        null,
        'POST',
        contactInfo
      );
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      
    } catch (error) {
      alert('Der skete en fejl, prøv igen senere', error)
    }
  };

  return (
    <>
    <Navbar/>
    <div className='container-fluid  p-0' id={styles.contactContainer}>
      <div className={styles.bannerContainer}>
        <div className='container'>
          <div className={styles.overlayText}>Kontakt</div>
        </div>
        <Image
          src={Banner}
          alt='Banner'
          className='img-fluid'
          id={styles.banner}
        />
      </div>

      {loadingInProgress ? (
        <div className="container " id={styles.loader}>
          <div className={styles.wrapper}>
            <Loader />
          </div>
        </div>
      ) : error ? (
        <Error />
      ) : (
        <div className='container-fluid mb-5'>
          <article className='row '>
            <section className='col-12 p-0'>
              <MapContainer
                className='z-0'
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: '450px', width: '100%' }}
              >
                <TileLayer
                  url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                />
              </MapContainer>
            </section>
          </article>

          <div className='container mt-5' >
            <article className='row'>
              <section className="col-12 col-md-12 col-lg-6 col-xl-6" id={styles.contactInner}>
                <p className='ms-5 mt-5' id={styles.addresse}>Addresse</p>
                <p className='ms-5' id={styles.zip}><i className='fa-solid fa-location-dot me-3'></i>{data?.address}, {data?.zipcity}</p>

                <article className='row mt-5'>
                  <section className='col-6'>
                    <p className='ms-5' id={styles.information}>Kontakt information</p>
                    <p className='ms-5'>
                      <SvgPhone className="me-2" id={styles.icon}/>
                      {data?.phone}
                    </p>
                    <p className='ms-5'>
                      <SvgMobil className="me-2" id={styles.icon}/>
                      {data?.phone}
                    </p>
                    <p className='ms-5'>
                      <SvgMail className="me-2" id={styles.icon}/>
                      {data?.email}
                    </p>
                  </section>
                  <section className='col-6'>
                    <p id={styles.hours}>Åbningstider</p>
                    <p><SvgClock className="me-3" id={styles.icon}/> Man - Fre : 06 til 20</p>
                    <p> <SvgClock className="me-3" id={styles.iconNone}/> Lør - Søn : 09 til 14</p>
                  </section>
                </article>
              </section>
              <section className="col-12 col-md-12 col-lg-6 col-xl-6" id={styles.formContainer}>
                <p className='ms-5 mt-5 mb-3'>Kontakt os</p>
                <form className="p-0" onSubmit={handleSubmit}>
                  <article className="row justify-content-center ">
                    <div className=" col-10 p-0 mb-4" id={styles.inputCon}>
                      <input
                        type="text"
                        className="form-control p-3"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Navn*"
                        
                      />
                      
                    </div>
                    <div className=" col-10 p-0 mb-4 " id={styles.inputCon}>
                      <input
                        type="email"
                        className="form-control p-3 "
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email*"
                       
                      />
                      
                    </div>
                    <div className=" col-10 p-0 mb-4 " id={styles.inputCon}>
                      <input
                        type="number"
                        className="form-control  p-3"
                        id="number"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Tlf"
                      />
                    </div>
                    <div className="mb-2 col-10 p-0">
                      <textarea
                        placeholder="Besked*"
                        className="form-control  p-3"
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        rows="6"
                       
                      ></textarea>
                      
                    </div>
                    <section className='col-10 p-0 mt-4 mb-5'>
                      <article className='row m-0 justify-content-end '>
                        <button type="submit" className="btn col-12 col-md-12 col-lg-4 col-xl-4  pt-3 pb-3 mb-2 ">
                          Send besked
                        </button>
                      </article>
                    </section>
                  </article>
                  {nameError && <p className="text-white ms-5">*udfyld navn</p>}
                  {emailError && <p className="text-white ms-5">*Husk din mail adresse</p>}
                  {messageError && <p className="text-white ms-5 mb-5">*Husk en besked</p>}
                </form>
                {isSubmitted && (
                  <p className='text-center'>Din besked er nu blevet sendt! :)</p>
                )}
              </section>
            </article>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Page;
