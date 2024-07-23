import { Logo } from "components"
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from 'utils/Helpers'
// Icons
import { MdLanguage, MdToken } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { GiRobotHelmet } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { useAxios } from "hooks";
import "styles/index.css"

export const Offcanvas = ({id}) => {
    
    return (
    <div className="offcanvas offcanvas-start text-white bg-gray-900 !w-[25%] md:!w-[100%] " tabIndex="-1" id={id}>
        
        <div className="offcanvas-header flex justify-between">
            <Logo data-bs-dismiss="offcanvas" />
            <button data-bs-dismiss="offcanvas"><IoMdClose fontSize={32} /></button>
        </div>

        <div className="offcanvas-body">
            <Option 
                className=""
                title={"Tokens"} 
                icon={<MdToken />}
                to="/tokens" />

            <Option 
                className=""
                title={"Deploy a Model"} 
                icon={<MdLanguage />}
                to="/deploy-model" />

            <Option 
                className=""
                title={"Use your Models"} 
                icon={<FaUser />}
                to="/use-model" />

            <Option 
                className=""
                title={"Fine Tune"} 
                icon={<GiRobotHelmet />}
                to="/fine-tune" />

            <Option 
                className=""
                title={"Profile"} 
                icon={<FaUser />}
                to="/my-profile/" />
         </div>

         <div className="offcanvas-footer p-3">
            <LogoutBtn />
         </div>
    </div>
  )
}

export const Option = ({
    title, to, icon, className
}) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <button 
            onClick={() => navigate(to)}
            className={`btn ofc-btn bg-green-500 w-100 flex items-center my-4 border-1 border-solid border-black hover:bg-blue-300 rounded ${(pathname === to) ? "active" : ""}`}
            data-bs-dismiss="offcanvas"
        >
            <div className="flex">
                <span className="text-3xl">{icon}</span>
            </div>
            <div className={`flex items-center gap-2 py-2 px-2 text-xl ${className}`}>
                {title}
            </div>
        </button>
    )
}

export const LogoutBtn = () => {
    
    const navigate = useNavigate();
    const { authStatus, setAuthStatus } = useContext(AuthContext);

    const { call } = useAxios({
        method: "POST",
        url: "/api/logout/"
    })
    
    function handleLogout(){
        Logout(setAuthStatus, navigate);
        call();
    }

    return (
        <>
        {
            authStatus && 
            <button className="ms-auto flex gap-2 btn btn-outline-dark" onClick={handleLogout} data-bs-dismiss="offcanvas">
                <IoMdLogOut className="text-2xl font-bold" /> Logout
            </button>
        }
        </>
    )
}
