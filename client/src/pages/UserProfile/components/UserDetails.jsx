import { ProfileImage } from "components";
import Overlay from "components/generic/Overlay";
import { formatDistance } from "date-fns";
import { useAxios } from "hooks"
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom"

const UserDetails = () => {

  const { userid } = useParams();
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
  }, [])

  if (error) {
    return <Overlay><p>404 | Not found</p></Overlay>
  }

  return (
    <>
    <div className="flex flex-col gap-1 my-3 items-center justify-center">
      {
        loading ? <Spinner /> :
        <>
          <ProfileImage size={72} imgSrc={profile} userid={userid}  />
          <p className="text-3xl text-white mt-3">{name}</p>
          <h5> Joined: { creation_time ? formatDistance(new Date(creation_time), new Date(), { addSuffix: true }) : "" } </h5>

          <div className="container flex justify-center">
            { 
              bio && <div className="my-12 text-white text-lg">
                <span className="" dangerouslySetInnerHTML={{__html: bio}}></span>
              </div>
            }
          </div>
        </>
      }
    </div>
    </>
  )
}

export default UserDetails