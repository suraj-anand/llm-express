import { Link } from "react-router-dom";
import { Img } from "./Image"
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";

export const ProfileImage = ({
  userid="", imgSrc="", className, size=36, ...rest
}) => {
  
  return (
  <Link to={`/user/${userid}`}>
    {
      imgSrc ?
      <Img
        src={`${axios.defaults.baseURL}/api/media/?file=${imgSrc}`}
        alt="circleimage"
        className={`h-[70px] w-[70px] rounded-[50%] ${className}`}
        {...rest}
      /> :
      <button {...rest}>
        <FaRegUserCircle size={size} className={`${className}`}  />
      </button>
    }
  </Link>
  )

}