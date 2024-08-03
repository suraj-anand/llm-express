import Navbar from "components/shared/Navbar"
import UserInfo from "./components/UserInfo"
import { ToastContainer } from "react-toastify"

const MyProfile = () => {

    return (
    <>
        <Navbar type="back" />
        <UserInfo />
        <ToastContainer theme="dark" />
    </>
  )
}

export default MyProfile