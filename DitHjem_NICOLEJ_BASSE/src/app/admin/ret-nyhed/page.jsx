"use client"
import React, {useEffect, useState, useRef} from 'react'
import AdminNavbar from '../components/AdminNavbar'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import useRequestData from "../../hooks/useRequestData";
import { useSearchParams } from 'next/navigation'
import { useUserContext } from '@/app/providers/userProvider';
import { useRouter } from 'next/navigation';
import Loader from "../../components/Loader"
import Image from 'next/image';


const page = ({searchParams}) => {
    const id = searchParams.id;
    const {data, error, isLoading, makeRequest} = useRequestData();
    const quillRef = useRef(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const router = useRouter();
    const {user} = useUserContext();

    useEffect(()=> {
        if (!user) {
          router.replace("/login")
        }
      }, [user, router])
    
      useEffect(() => {
        if (id) {
          makeRequest(`http://localhost:5333/news/${id}`);
        }
      }, [id]);


      const handleSubmit = (event) => {
        event.preventDefault(); 
        
        const title = event.target.elements.title.value; 
        const content = quillRef.current?.getEditor().root.innerHTML; 
        const image = event.target.elements.image.files[0]; 
        
        const formData = new FormData(); 
        
        formData.append('title', title);
        formData.append('content', content);
        
        
        const timestamp = new Date().toISOString().replace(/:/g, '-'); 
        const imageFileName = `${timestamp}_${image?.name}`;
        formData.append('image', image, imageFileName);
        
        const requestOptions = {
          headers: {
            "Content-Type": "application-json",
          },
          body: formData, 
        };
      
        makeRequest(`http://localhost:5333/news/admin/${id}`, requestOptions.headers, null, 'PUT', requestOptions.body)
          .then(() => {
            const confirmed = window.confirm('Er du sikker på at du vil rette nyhed?');
            if (confirmed) {
              setIsUpdated(true); 
            }
          })
          .catch((error) => {
            console.error("Error updating News:", error);
          });
      };

      if (!id) {
        return (
          <main >
            <AdminNavbar />
            <div className='container d-flex flex-column'>
              <article className='row p-0 m-0 d-flex justify-content-center'>
                <h2 className='text-center mt-5'>Ingen id sendt med...</h2>
                <p className='text-center'>Gå venligst tilbage til nyhed siden og valge en nyhed</p>
              </article>
            </div>
          </main>
        );
      }
    

  





  return (
    <>
    <AdminNavbar/>

   <div className='container'>
   <article className="row p-0 m-0">
            <section className="col-12 p-0 rounded" >
              <h2 className="mt-4 ms-4 mb-0 text-center">Nyhed ID: {id}</h2>
              <div className="d-flex justify-content-center mt-4">
                <hr />
              </div>
              {isUpdated && (
                <div className="alert alert-success" role="alert">
                  <p className='text-center text-success '>Nyheden med  {id}</p>
                  <p className='text-center text-success '>Er blevet opdateret</p>
                </div>
              )}
              {!isUpdated && (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : error ? (
                    <Error />
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row m-0">
                        <div className="col-12 ">
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              Title:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              defaultValue={data?.title}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                              Content:
                            </label>
                            <ReactQuill
                              theme="snow"
                              ref={quillRef}
                              defaultValue={data?.content}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                              Image:
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="image"
                              name="image"
                              accept="image/*"
                            />
                            {data?.image && (
                              <Image
                                src={`http://localhost:5333/images/news/` + data.image}
                                alt="Treatment Image"
                                width={1390}
                                height={1290}
                                className="img-fluid mt-2 rounded-2"
                              />
                            )}
                          </div>
                        </div>

                        <article className='row m-0'>
                       
                        <button
                          className="btn btn-success  pt-3 pb-3 mb-4 "
                          type="submit"
                        >
                          Ret Treatment
                        </button>

                        </article>
                        
                      </div>
                      
                    </form>
                  )}
                </>
              )}
            </section>
          </article>
   </div>
    </>
  )
}

export default page