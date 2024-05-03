"use client"
import React, { useState, useEffect } from 'react';
import LoaderGIF from '../../../public/assets/page-loader-img.gif';
import Image from 'next/image';

const SliderLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {visible && (
        <div className='loader-container '>
          <div className='loader'>
            <Image src={LoaderGIF} alt="Loader" />
          </div>
        </div>
      )}
    </>
  );
};

export default SliderLoader;
