"use client"
import React, {useEffect, useState} from 'react'
import useRequestData from '../hooks/useRequestData'
import { useUserContext } from '../providers/userProvider'
import { useRouter } from 'next/navigation'
import Loader from "../components/Loader"
import Link from 'next/link'
import styles from "./adminPage.module.scss"
import AdminNavbar from './components/AdminNavbar'




const Page = () => {
    const {data, error, makeRequest} = useRequestData();
    const router = useRouter();
    const {user} = useUserContext();

    useEffect(() => {
        if (!user) {
          router.replace("/login");
        }
      }, [user, router]);

    
    
      if (!user) {
        return null;
      }

     

     
  return (
    <>


    <AdminNavbar/>
    <div className='container' id={styles.adminContainer}>
        <h3 className='text-center mt-3'>Velkommen til admin <span>{user.name}</span>! :)</h3>

        <article className='row m-0'>

          {data?.map((item, idx) => (
            <>
            <p>{item.message}</p>
            </>
          ))}

        </article>


    </div>

    </>
  )
}

export default Page