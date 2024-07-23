import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "components/shared/Navbar";
import Feature from "./components/Feature";
import Footer from "components/shared/Footer";
import { useAxios } from "hooks";
import { AuthContext } from "context/AuthContext";
import { Spinner } from "react-bootstrap";
import Search from "components/shared/Search";

export default function LandingPagePage() {

  const {
      data,
      loading,
      status_code,
      call
  } = useAxios({
      url: "/api/auth-check/",
      method: "POST"
  });

  const { setAuthStatus } = useContext(AuthContext);

  const [ showSearch, setShowSearch ] = useState(false);


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
            <Spinner className='text-blue-600' />
        </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>LLM-Express</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      
      <Navbar handleSearchClick={() => {setShowSearch(search => (!search))}}/>
      <Search show={showSearch} />
      <Feature />
      <Footer />
      
    </>
  );
}
