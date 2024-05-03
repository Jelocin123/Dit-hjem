"use client"
import React, {useEffect, useState} from 'react'
import styles from "../../styles/navbar.module.scss"
import stylesTwo from "../../styles/navbarModal.module.scss"
import useRequestData from '@/app/hooks/useRequestData'
import Loader from '../Loader'
import Error from '../Error'


const NyhedModal = () => {
    const {data, error, makeRequest} = useRequestData();
    const [loadingInProgress, setLoadingInProgress] = useState(true);
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleLoadChange = () => {
        setLoadingInProgress(true);
        setTimeout(() => {
          setLoadingInProgress(false);
        }, 500);
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
      
        if (!email.trim()) {
          setEmailError(true);
        }
    
    
        if (!email) {
          return;
        }
    
        const requestOptions = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const newsInfo = {
            email,
        };
        try {
          const response = await makeRequest(
            'http://localhost:5333/newssubscription',
            requestOptions.headers,
            null,
            'POST',
            newsInfo
          );
          setIsSubmitted(true);
   
          setEmail('');

          
        } catch (error) {
          alert('Der skete en fejl, prøv igen senere', error)
        }
      };
    
  return (
    <>

<button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
<p className="text-end me-2 d-inline" id={styles.newsletterP}>
                    <i className="fa-solid fa-right-to-bracket me-2 " id={styles.firstIcon}></i>Tilmeld nyhedbrev
                  </p>
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Tilmeld dig vores nyhedsbrev</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" id={stylesTwo.modalCon}>
      <form className="p-0" onSubmit={handleSubmit}>
                  <article className="row justify-content-center ">
                    
                    <div className=" col-10 p-0  " id={styles.inputCon}>
                      <input
                        type="email"
                        className="form-control p-3 "
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email*"

                      />
                      
                    </div>
                 
                   
                    <section className='col-10 p-0 '>
                      <article className='row m-0 '>
                        <button type="submit" className="btn col-12 mt-5 mb-4  ">
                          Tilmeld
                        </button>
                      </article>
                    </section>
                  </article>
                  {emailError && <p className="text-danger ms-5">*Husk din mail adresse</p>}
                </form>
                {isSubmitted && (
                  <p className='text-center'>Du er nu blevet tilmeldt! :)</p>
                )}
      </div>
      
    </div>
  </div>
</div>
    </>
  )
}

export default NyhedModal