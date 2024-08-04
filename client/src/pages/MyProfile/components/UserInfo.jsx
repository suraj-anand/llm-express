import { ProfileImage } from "components";
import Overlay from "components/generic/Overlay";
import { formatDistance } from "date-fns";
import { useAxios } from "hooks"
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import ChangeProfileModal from "./ChangeProfileModal";
import ChangePassword from "./ChangePassword";
import { RiRefreshLine } from "react-icons/ri";
import { PiDotsThreeVerticalBold, PiPassword } from "react-icons/pi";
import { FcInfo, FcPicture } from "react-icons/fc";
import ChangeBio from "./ChangeBio";
import DeleteProfileImage from "./DeleteProfileImage";

const UserInfo = () => {

  const [reload, setReload] = useState(false);
  const userid = localStorage.getItem("user_id");
  const {
    data,
    error,
    loading,
    call
  } = useAxios({
    method:"GET",
    url: `/api/user/${userid}`
  })
  const { name, creation_time, profile, bio } = data;

  useEffect(() => {
    call()
  }, [reload])

  if (error) {
    return <Overlay><p>404 | Not found</p></Overlay>
  }

  return (
    <>
    <div className="flex flex-col gap-1 my-3 items-center justify-center">
      {
        loading ? <Spinner /> :
        <>

          <div className="container justify-end flex ms-auto gap-5 dropdown">
            <button className="z-50 " type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" >
                <PiDotsThreeVerticalBold className="fw-bolder text-lg" size={36} />
            </button>

            <ul className="dropdown-menu bg-gray-400">
              <li data-bs-toggle="modal" data-bs-target="#generic-modal"  className="flex gap-2 items-center dropdown-item hover:text-blue-500">
                <button className="my-1" title="Change Profile">
                  <RiRefreshLine size={22} />
                </button>
                Change Profile
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li data-bs-toggle="modal" data-bs-target="#change-password" className="flex gap-2 items-center dropdown-item hover:text-green-900">
                <button className="my-1" title="Change Profile">
                  <PiPassword size={22} />
                </button>
                Change Password
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li data-bs-toggle="modal" data-bs-target="#change-bio" className="flex gap-2 items-center dropdown-item hover:text-gray-600_01">
                <button className="my-1" title="Change Bio">
                  <FcInfo size={22} />
                </button>
                Change Bio
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li data-bs-toggle="modal" data-bs-target="#delete-profile" className="flex gap-2 items-center dropdown-item hover:text-gray-600_01">
                <button className="my-1" title="Delete Profile Image">
                  <FcPicture size={22} />
                </button>
                Delete Profile Image
              </li>
            </ul>
          </div>

          <ProfileImage size={72} imgSrc={profile} userid={userid}  />

          <p className="text-3xl mt-3">{name}</p>
          <h5> Joined: { creation_time ? formatDistance(new Date(creation_time), new Date(), { addSuffix: true }) : "" } </h5>
        </>
      }

    <div className="container flex justify-center">
      { 
        bio && <div className="text-dark mt-4 text-lg">
          <span dangerouslySetInnerHTML={{__html: bio}}></span>
        </div>
      }
    </div>

    </div>
  
    
    <ChangeProfileModal setReload={setReload} />
    <ChangePassword setReload={setReload} />
    <ChangeBio oldBio={bio} setReload={setReload} />
    <DeleteProfileImage setReload={setReload} />
    </>
  )
}

export default UserInfo