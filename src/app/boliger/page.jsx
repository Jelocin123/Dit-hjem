"use client"
import React, { Fragment, useEffect, useState } from 'react';
import styles from './bolig.module.scss';
import useRequestData from '../hooks/useRequestData';
import Image from 'next/image';
import Banner from '../../../public/assets/banner.jpg';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar/Navbar';

const Page = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState(null);
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const [loadingInProgress, setLoadingInProgress] = useState(true);
  const router = useRouter();

  useEffect(() => {
    makeRequest('http://localhost:5333/estate');
    handleLoadChange();

  }, []);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const handleLoadChange = () => {
    setLoadingInProgress(true);
    setTimeout(() => {
        setLoadingInProgress(false);
    }, 500);
};

  const numBoliger = data ? data.length : 0;

  const comparePrices = (a, b) => {
    const priceA = parseInt(a.price.replace(/\./g, ''));
    const priceB = parseInt(b.price.replace(/\./g, ''));

    if (sortBy === 'asc') {
      return priceA - priceB;
    } else if (sortBy === 'desc') {
      return priceB - priceA;
    }
    return 0;
  };

  
  const sortedData = data ? [...data].sort(comparePrices) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const handleSortChange = (sortType, e) => {
    e.preventDefault();
    setSortingInProgress(true);
    setTimeout(() => {
      setSortBy(sortType);
      setSortingInProgress(false); 
    }, 2200); 
  };

  return (
    <>
    <Navbar/>
    <div className="container-fluid p-0" id={styles.boligContainer}>
      <div className={styles.bannerContainer}>
        <div className="container">
          <div className={styles.overlayText}>Alle boliger</div>
        </div>
        <Image src={Banner} alt="Banner" className="img-fluid" id={styles.banner} />
      </div>

      <div className="container">
        <article className="row m-0">
          <section className="col-12 col-md-12 col-lg-3 col-xl-3 mt-3 mb-0 mt-md-0 mt-lg-5 mt-xl-5 mb-md-0 mb-lg-5 mb-xl-5 ">
            <h6>{`${numBoliger} Boliger fundet`}</h6>
          </section>
          <section className="col-12 col-md-12 col-lg-3 col-xl-3 mt-3 mb-0 mt-md-0 mt-lg-5 ms-auto mt-xl-5 mb-md-0 mb-lg-5 mb-xl-5">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle col-12 pt-2 pb-2 text-start"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sorter {sortBy === null ? 'efter' : sortBy === 'asc' ? 'Lav til høj' : 'Høj til lav'}
              </button>
              <ul className="dropdown-menu col-12" id={styles.dropdownWidth}>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleSortChange('asc', e)}
                  >
                    Lav til høj
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleSortChange('desc', e)}
                  >
                    Høj til lav
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </article>

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
               

      
        {sortingInProgress ? (
          <Loader />
        ) : (
        
        
          <>
            <article className="row m-0">
              {currentItems.map((item, idx) => (
                <Fragment key={idx}>
                  <section className="col-12 col-md-12 col-lg-4 col-xl-4 mt-4 position-relative ">
                    <Link className='text-decoration-none ' href={{pathname: '/bolig-detalje', query: {id: item._id}}} id={styles.linkHouse}>
                    <Image
                      className="img-fluid"
                      src={'http://localhost:5333/images/property/' + item.image}
                      width={1000}
                      height={1000}
                      alt={'Houses' + idx}
                    />
                    <div className={styles.houseOverlay}>
                      <p className={styles.houseOverlayText}>Til salg</p>
                    </div>
                    <article className="row m-0 pb-3" id={styles.imageBox}>
                      <section className="col-12">
                        <p className="mt-3 ms-2">{item.address.split(',')[0]}</p>
                      </section>
                      <section className="col-7">
                        <p className="ms-2" id={styles.addressP}>
                          <i className="fa-solid fa-location-dot"></i>
                          {item.address.split(',').slice(1).join(',')}
                        </p>
                      </section>
                      <section className="col-5">
                        <p className="text-end me-2" id={styles.priceP}>
                          {item.price}
                        </p>
                      </section>
                    </article>
                    </Link>
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
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Page;
