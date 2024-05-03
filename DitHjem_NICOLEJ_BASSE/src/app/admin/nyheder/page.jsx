import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import styles from "./adminNews.module.scss"
import Link from 'next/link'

const page = () => {
  return (
    <>
    <AdminNavbar/>

    <div className='container mt-5' id={styles.newsContainer}>
        <article className='row mt-5 mb-5 justify-content-center'>
            <section className="col-12 col-md-4 col-lg-3 col-xl-3  me-5" id={styles.postNews}>
                <Link className='text-decoration-none ' href={"/admin/post-nyhed"} >
                <h4 className='text-center mt-4' >Opret</h4>

                <p className='text-center'>Tryk her for at oprette en nyhed</p>
                </Link>
            </section>
            <section className="col-12 col-md-4 col-lg-3 col-xl-3" id={styles.editNews}>
                <Link className='text-decoration-none ' href={"/admin/ret-nyhed"}>
                <h4 className='text-center mt-4'>Ret</h4>
                <p className='text-center'>Tryk her for at rette en nyhed</p>
                </Link>
            </section>
            <section className="col-12 col-md-4 col-lg-3 col-xl-3 ms-5" id={styles.delNews}>
                <Link className='text-decoration-none ' href={"/admin/slet-nyhed"}>
                <h4 className='text-center mt-4'>Slet</h4>
                <p className='text-center'>Truk her for at slette en nyhed</p>
                </Link>
            </section>
        </article>
    </div>
    </>
  )
}

export default page