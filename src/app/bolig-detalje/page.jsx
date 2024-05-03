"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useRequestData from "@/app/hooks/useRequestData";
import styles from "./detail.module.scss";
import Banner from "../../../public/assets/banner.jpg";
import Image from "next/image";
import Loader from "../components/Loader";
import Navbar from "../components/navbar/Navbar";
import { useUserContext } from "../providers/userProvider";

const Page = ({ searchParams }) => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const id = searchParams.id;
  const router = useRouter();
  const [loadingInProgress, setLoadingInProgress] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [estateaddress, setEstateAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    if (id) {
      makeRequest(`http://localhost:5333/estate/${id}`);
      handleLoadChange();
    }
  }, [id]);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
})


  const handleLoadChange = () => {
    setLoadingInProgress(true);
    setTimeout(() => {
      setLoadingInProgress(false);
    }, 500);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleEstateAddressChange = (event) => {
    setEstateAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const estateDetails = {
      name,
      email,
      message,
      address,
      estateaddress,
    };
    try {
      const response = await makeRequest(
        'http://localhost:5333/estatecontact',
        requestOptions.headers,
        null,
        'POST',
        estateDetails
      );
      setName('')
      setEmail('')
      setMessage('')
      setAddress('')
      setEstateAddress('')
      setIsSubmitted(true);
      
      
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      alert('Error posting review:', error)
    }
  };

  return (
   <>
   <Navbar/>
   <div className="container-fluid p-0" id={styles.detailContainer}>
      <div className={styles.bannerContainer}>
        <Image
          src={Banner}
          alt="Banner"
          className="img-fluid"
          id={styles.banner}
        />
      </div>
      {isSubmitted ? (
        <p className="text-center">Din besked er nu blevet sendt!:)</p>
      ) : (
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
            <div>Error: {error.message}</div>
          ) : (
            <article className="row justify-content-center">
              <section className="col-12 col-md-12 col-lg-6 col-xl-6 mt-5 mb-0 mb-md-0 mb-lg-5 mb-xl-5 p-0 " id={styles.imgCon}>
                <Image
                  className="img-fluid"
                  id={styles.imgHeight}
                  src={`http://localhost:5333/images/property/${data?.image}`}
                  width={6600}
                  height={6000}
                  alt="House"
                />
              </section>
              <section
                className="col-12 col-md-12 col-lg-4 col-xl-4 mt-0 mt-md-0 mt-lg-5 mt-xl-5 mb-5 ps-4 pe-4"
                id={styles.infoBackground}
              >
                <p id={styles.firstP} className="pt-3 mb-2">
                  {data?.address?.split(",")[0]}
                </p>
                <p id={styles.secondP} className="">
                  <i className="fa-solid fa-location-dot"></i>
                  {data?.address?.split(",").slice(1).join(",")}
                </p>
                <p id={styles.thirdP} className="">
                  {data?.price}
                </p>
                <p id={styles.forthP} className="">
                  Hør mere om denne bolig
                </p>
                <form className="p-0" onSubmit={handleSubmit}>
                  <article className="row ">
                    <div className=" col-6 pe-0" id={styles.inputCon}>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Navn"
                        required
                      />
                    </div>
                    <div className=" col-6 " id={styles.inputCon}>
                      <input
                        type="email"
                        className="form-control "
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className=" col-6 pe-0" id={styles.inputCon}>
                      <input
                        type="text"
                        className="form-control"
                        id="addresse"
                        value={address}
                        onChange={handleAddressChange}
                        placeholder="Din addresse"
                        required
                      />
                    </div>
                    <div className=" col-6 " id={styles.inputCon}>
                      <input
                        type="text"
                        className="form-control "
                        id="estateAddresse"
                        value={estateaddress}
                        onChange={handleEstateAddressChange}
                        placeholder="Estate Addresse"
                        required
                      />
                    </div>
                    <div className="mb-2 col-12">
                      <textarea
                        placeholder="Besked"
                        className="form-control "
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn col-4 pt-3 pb-3 mb-2">
                      Send besked
                    </button>
                  </article>
                </form>
              </section>
            </article>
          )}
        </div>
      )}
    </div>
   </>
  );
};

export default Page;
