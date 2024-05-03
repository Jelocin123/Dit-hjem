"use client"
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import useRequestData from '@/app/hooks/useRequestData';

const Page = () => {
    const { data, makeRequest } = useRequestData();

    const handleAddNews = (id) => {
        const formData = new FormData();
        formData.append("read", true);

        makeRequest(
            `http://localhost:5333/contact/admin/${id}`, 
            null,
            null,
            "PATCH",
            formData
        )
        .then(() => {
            window.alert(`Besked er læst`);
        
            makeRequest("http://localhost:5333/contact/admin");
        })
        .catch((addError) => {
            console.error("Error marking message as read:", addError);
        });
    };

    const handleDelete = (id) => {
        makeRequest(
            `http://localhost:5333/contact/admin/${id}`,
            null,
            null,
            "DELETE"
        )
        .then(() => {
            window.alert(`Besked er slettet`);
       
            makeRequest("http://localhost:5333/contact/admin");
        })
        .catch((deleteError) => {
            console.error("Error deleting message:", deleteError);
        });
    };

    useEffect(() => {
        makeRequest("http://localhost:5333/contact/admin");
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className='container'>
                <h2>Kontakt</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Besked</th>
                            <th>Status</th>
                            <th>Delete</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.map((item, idx) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.message}</td>
                                <td>
                                    {item.read ? (
                                        <span>Read</span>
                                    ) : (
                                        <button className='btn btn-success ' onClick={() => handleAddNews(item._id)}>Mark as Read</button>
                                    )}
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Page;
