import { useState, useEffect } from 'react';

const useMakeRequest = () => {

    //get request
    const getData = async (url, headers) => {
        try {
            const response = await fetch(url, {
                headers: headers
            })
            const res = await response.json();
            return res;
        } catch (error) {
            //throwing get request error
            throw new Error(error);
        }
    };

    //post request
    const postData = async (url, body, headers, formdata) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers ? headers : {
                    'Content-Type': 'application/json',
                },
                body: formdata ? body : JSON.stringify(body),   //not string if it is formdata
            });
            const res = await response.json();
            return res;
        } catch (error) {
            //throwing post request error
            throw new Error(error);
        }
    };
    //delete data
    const deleteData = async (url, headers) => {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: headers,

            });
            const res = await response.json();
            //console.log("delete res", res)
            return res;
        } catch (error) {
            //throwing delete request error
            throw new Error(error);
        }
    };

    //delete data
    const editData = async (url, headers, body) => {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)

            });
            const res = await response.json();
            //console.log("delete res", res)
            return res;
        } catch (error) {
            //throwing delete request error
            throw new Error(error);
        }
    };




    return { getData, postData, deleteData, editData };
};

export default useMakeRequest;
