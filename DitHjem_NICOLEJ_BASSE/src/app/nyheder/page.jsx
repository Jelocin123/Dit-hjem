"use client"
import React, { Fragment, useEffect, useState } from 'react';
import styles from "./news.module.scss";
import useRequestData from '../hooks/useRequestData';
import Link from 'next/link';
import Image from 'next/image';
import Banner from "../../../public/assets/banner.jpg";
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar/Navbar';
import { useUserContext } from '../providers/userProvider';

const NewsPage = () => {
    const { data, error, makeRequest } = useRequestData();
    const [loadingInProgress, setLoadingInProgress] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const router = useRouter();

   

    useEffect(() => {
        makeRequest("http://localhost:5333/news");
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

    const formatDate = (received) => {
        const date = new Date(received);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0'); 
        const year = date.getFullYear();
        return `${month}, ${day}, ${year}`;
    };

    const indexOfLastNews = currentPage * itemsPerPage;
    const indexOfFirstNews = indexOfLastNews - itemsPerPage;
    const currentNews = data?.slice(indexOfFirstNews, indexOfLastNews);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const numBoliger = data ? data.length : 0;

    return (
        <>
        <Navbar/>
        <div className="container-fluid p-0" id={styles.newsContainer}>
            <div className={styles.bannerContainer}>
                <div className="container">
                    <div className={styles.overlayText}>Nyheder</div>
                </div>
                <Image src={Banner} alt="Banner" className="img-fluid" id={styles.banner} />
            </div>

            <div className='container'>
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
                        <article className='row mt-5 justify-content-center '>
                            {currentNews.map((item, idx) => (
                                <Fragment key={idx}>
                                    <section className='col-9 mb-5 p-0 position-relative '>

                                        <div className=" p-2 p-md-2 p-lg-4 p-xl-4" id={styles.blueOverlay}>
                                            <h6 className='mb-3'>{item.title}</h6>
                                            <p className="mb-0" id={styles.date}>{formatDate(item.received)}</p>
                                        </div>
                                        <Image className='img-fluid' src={`http://localhost:5333/images/news/` + item.image} width={1000} height={1000} alt="News" />
                                        <section className='col-12' id={styles.imageText}>
                                            <p className='mt-4'>{item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content}</p>
                                            <Link href={{pathname:'nyheder-detalje', query: {id: item._id}}}>
                                                <button className='btn'>Se mere</button>
                                            </Link>
                                        </section>
                                    </section>
                                </Fragment>
                            ))}
                        </article>

                        
                    </>
                )}

<div className="row mt-3">
              <div className="col-12 d-flex justify-content-center">
                <nav aria-label="Page navigation ">
                  <ul className="pagination ">
                    <li className="page-item" id={styles.paginationLi}>
                      <a
                        onClick={() => paginate(currentPage - 1)}
                        className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                        aria-disabled={currentPage === 1}
                      >
                        <i className="fa-solid fa-angle-left"></i>
                      </a>
                    </li>

                    {[...Array(Math.ceil(numBoliger / itemsPerPage)).keys()].map((number) => (
                      <li key={number} className="page-item " id={styles.paginationLi}>
                        <a
                          onClick={() => paginate(number + 1)}
                          className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}
                        >
                          {number + 1}
                        </a>
                      </li>
                    ))}

                    <li className="page-item" id={styles.paginationLi}>
                      <a
                        onClick={() => paginate(currentPage + 1)}
                        className={`page-link ${
                          currentPage === Math.ceil(numBoliger / itemsPerPage) ? 'disabled' : ''
                        }`}
                        aria-disabled={currentPage === Math.ceil(numBoliger / itemsPerPage)}
                      >
                        <i className="fa-solid fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default NewsPage;
