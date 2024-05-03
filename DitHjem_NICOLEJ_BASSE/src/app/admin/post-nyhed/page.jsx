"use client";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import styles from "./postNews.module.scss";
import useRequestData from "@/app/hooks/useRequestData";
import { useUserContext } from "../../providers/userProvider";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import Error from "@/app/components/Error";

const page = () => {
  const { data, error, makeRequest } = useRequestData();
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const { user } = useUserContext();
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleAddNews = (e) => {
    e.preventDefault();

    setTitleError(false);
    setContentError(false);
    setImageError(false);

    if (newNews.title.trim() === "") {
      setTitleError(true);
      return;
    }
    if (newNews.content.trim() === "") {
      setContentError(true);
      return;
    }
    if (newNews.image === null) {
      setImageError(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", newNews.title);
    formData.append("content", newNews.content);
    formData.append("image", newNews.image);

    makeRequest(
      "http://localhost:5333/news/admin",
      null,
      null,
      "POST",
      formData
    )
      .then(() => {
        window.alert(`Nyhed med navn "${newNews.title}" er på blevet oprettet`);
        window.location.reload();
      })
      .catch((addError) => {
        console.error("Der skete en fejl med at oprette nyhed:", addError);
      });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container" id={styles.postCon}>
        <article className="row justify-content-center ">
          <section className="col-12 col-md-12 col-lg-6 col-xl-6 ">
            {error ? (
              <Error />
            ) : isSubmitted ? (
              <>
                
              </>
            ) : (
              <form className="p-0">
                <article className="row justify-content-center ">
                  <div className=" col-10 p-0 mb-4" id={styles.inputCon}>
                    <input
                      type="text"
                      className="form-control p-3"
                      id="title"
                      value={newNews.title}
                      onChange={(e) =>
                        setNewNews({ ...newNews, title: e.target.value })
                      }
                      placeholder="Title*"
                    />
                  </div>
                  <div className=" col-10 p-0 mb-4 " id={styles.inputCon}>
                    <input
                      type="text"
                      className="form-control p-3 "
                      id="content"
                      value={newNews.content}
                      onChange={(e) =>
                        setNewNews({ ...newNews, content: e.target.value })
                      }
                      placeholder="Content*"
                    />
                  </div>
                  <div className=" col-10 p-0 mb-4 " id={styles.inputCon}>
                    <input
                      type="file"
                      className="form-control  p-3"
                      id="image"
                      onChange={(e) =>
                        setNewNews({
                          ...newNews,
                          image: e.target.files[0],
                        })
                      }
                    />
                  </div>

                  <section className="col-10 p-0 mt-4 mb-5">
                    <article className="row m-0 justify-content-center ">
                      <button
                        type="submit"
                        className="btn col-12 col-md-12 col-lg-6 col-xl-6  pt-3 pb-3 mb-2  "
                        onClick={handleAddNews}
                      >
                        Send besked
                      </button>
                    </article>
                  </section>
                </article>
                {titleError && (
                  <p className="text-danger ms-5">*Udfyld Title</p>
                )}
                {contentError && (
                  <p className="text-danger ms-5">*Husk Content</p>
                )}
                {imageError && (
                  <p className="text-danger ms-5 mb-5">*Husk et billede</p>
                )}
              </form>
            )}
          </section>
        </article>
      </div>
    </>
  );
};

export default page;
