import axios from "axios";
import { Img } from "components";
import { useAxios } from "hooks";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

const ProfileIcon = ({className, size, rest}) => {

    const user_id = localStorage.getItem("user_id");
    const [ profile, setProfile ] = useState("");

    async function fetchProfile(){
        const response = await axios.get(`/api/user/${user_id}`);
        let data = {};
        setProfile(() => {
            data = response.data;
            if(data?.profile){
                sessionStorage.setItem("profile", data?.profile);
            } else {
                sessionStorage.setItem("profile", "");
            }
            return data?.profile ? data?.profile : "" 
        })
    }

    useEffect(() => {
        if (sessionStorage.getItem("profile") || (sessionStorage.getItem("profile") === "" && Object.keys(sessionStorage).includes("profile"))){
            setProfile(sessionStorage.getItem("profile"))
        } else {
            fetchProfile();
        }
    }, [])

    return (
        <>
        {
        profile ?
        <Img
            src={`${axios.defaults.baseURL}/api/media/?file=${profile}`}
            alt=""
            className={`h-[70px] w-[70px] rounded-[50%] ${className}`}
            {...rest}
        /> :
        <button {...rest}>
            <FaRegUserCircle size={size} className={`${className}`}  />
        </button>
        }
        </> 
    )
}

export default ProfileIcon