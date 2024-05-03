import React from 'react';
import styles from '../../styles/sellestate.module.scss';
import bg from '../../../../public/assets/hiw-bg.jpg';
import Image from 'next/image';
import iCon1 from "../../../../public/assets/icon-1.svg";
import iCon2 from "../../../../public/assets/icon-2.svg";
import iCon3 from "../../../../public/assets/icon-3.svg";

import Link from 'next/link';

const SellEstate = () => {
  return (
    <div className={`container-fluid p-0 mt-5  ${styles.imageContainer}`}>
      <div className={styles.overlay}>
        <div className='container'>
          <h4 className={`${styles.title} mt-5 mt-md-3 ms-3 mt-lg-5`}>Velkommen</h4>
          <p className={`${styles.description} ms-3`}>Sælg din bolig hos os</p>
          <p className={`${styles.description2nd} mt-3 ms-3`}>Vi har en stor kundebase til at markedsføre din ejendom til rigtige købere. Så kom i gang ved at følge disse enkle trin.</p>
          <div className='row m-0 mt-5 mt-md-0'>
            <div className="col-12 col-md-3 col-lg-4 col-xl-3 mt-lg-4 mt-0">
              <Image src={iCon1} alt="Icon 1" id={styles.iconMedium}/>
              <p className='mt-4 mt-md-0 mb-md-0 mt-lg-2' id={styles.iconP}>Tilmeld</p>
              <p className='mb-md-0 mt-lg-1' id={styles.iconP2nd}>Opret dig i vores databse of få adgang til rigtige købere</p>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 ms-0 ms-md-5 ms-lg-5 ms-xl-5 mt-1 mt-md-0 mt-lg-4 ">
              <Image src={iCon2} alt="Icon 2" id={styles.iconMedium}/>
              <p className='mt-4 mt-md-0 mt-lg-2 mb-md-0' id={styles.iconP}>Udfyld detaljer om din bolig</p>

            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 mt-1 mt-md-0 mt-lg-4">
              <Image src={iCon3} alt="Icon 3" id={styles.iconMedium} />

              <p className='mt-4 mt-md-0 mb-md-0 mt-lg-2' id={styles.iconP}>Det var det!</p>
              <p className='mb-md-0  mt-lg-1' id={styles.iconP2nd}>Du har nu forbindelse til tusindvis af købere</p>
            </div>
          </div>
          <article className='row justify-content-center d-flex'>
            <Link className='btn col-8 col-md-6 col-lg-6 col-xl-2 ' href={"/opret"}>
            <button className='btn ps-3 pe-3 pt-2 pb-2'>Opret din bolig</button>
            </Link>
          </article>
        </div>
      </div>
      <Image className='img-fluid ' width={2560} src={bg} alt='House background' id={styles.imageSmall}/>
    </div>
  );
};

export default SellEstate;
