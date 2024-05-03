"use client"
import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/house.module.scss';
import useRequestData from '@/app/hooks/useRequestData';
import { useRouter } from 'next/navigation';

const Houses = () => {
  const { data, makeRequest } = useRequestData();
  const router = useRouter();

  useEffect(() => {
    makeRequest('http://localhost:5333/estate');
  }, []);

  return (
    <div className="container mt-4 mt-md-5 mt-lg-5 mt-xl-5" id={styles.houseContainer}>
      <article className="row">
        {data?.map((item, idx) => (
          <Fragment key={idx}>
            <section className="col-11 mx-auto col-md-6 col-lg-6 col-xl-3 p-0 mt-1" id={styles.innerSection}>
              
              <Link href={{pathname: '/bolig-detalje', query: {id: item._id}}}>
              <Image
                className="img-fluid "
                id={styles.houseImage}
                src={'http://localhost:5333/images/property/' + item.image}
                width={1000}
                height={1000}
                alt={idx}
              />
              </Link>
    
                <article className={`${styles.overlay} row m-0`}>
                    <section className='col-12 p-0'>
                        <p className={`${styles.pAddress} ps-3 mb-1 mt-2`}>{item.address}</p>
                    </section>
                    <section className='col-6 p-0'>
                        <p className={`${styles.pPrice} ps-3 `}>{item.price}</p>
                    </section>
                    <section className='col-3 ms-auto p-0 mt-2 ' id={styles.pSaleCon}>
                        <p className={`${styles.pSale} text-center me-3 `}>Til salg</p>
                    </section>
                </article>
            </section>
          </Fragment>
        ))}
      </article>
    </div>
  );
};

export default Houses;
