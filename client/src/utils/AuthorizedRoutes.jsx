import { AuthContext } from 'context/AuthContext';
import { useAxios } from 'hooks'
import { Login } from 'pages';
import React, { useContext, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const AuthorizedRoutes = () => {
  
    const {
        data,
        loading,
        status_code,
        call
    } = useAxios({
        url: "/api/auth-check/",
        method: "POST"
    });

    const { authStatus, setAuthStatus } = useContext(AuthContext)

    useEffect(() => {
        const isAuth = data?.detail === "Authenticated" 
        if (status_code === 202 && isAuth) {
            localStorage.setItem("user_id", data?.user_id);
            localStorage.setItem("user_name", data?.user_name);
            setAuthStatus(true);
        } else {
            setAuthStatus(false);
        }
    }, [status_code])

    
    useEffect(() => {
        call()
    }, [])


    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <Spinner className='text-red-500' />
            </div>
        )
    }

    return (
        <>
            { 
                authStatus ? <Outlet /> : <Login />
            }
        </>
    )
}

export default AuthorizedRoutes