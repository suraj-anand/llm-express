import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoReturnDownBack } from "react-icons/io5";

const Back = ({icon=null}) => {

    const navigate = useNavigate();
    function handleGoBack(){
        navigate(-1);
    }

    return (
        <button onClick={handleGoBack}>
            {icon ? <icon fontSize={36} /> : <IoReturnDownBack fontSize={36}  />}
        </button>
    )
}

export default Back