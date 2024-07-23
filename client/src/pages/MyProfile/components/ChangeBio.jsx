import Modal from "components/generic/Modal";
import { useAxios } from "hooks";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { RiRefreshLine } from "react-icons/ri";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ChangeBio({ oldBio=null, setReload }){

    const [ bio, setBio ] = useState(oldBio);
    const {
      call,
      loading,
      data,
      error
    } = useAxios({
      url: `/api/update-bio/`,
      method: "PATCH",
    });
  
    const saveRef = useRef();
    const closeRef = useRef();
    saveRef.current?.removeAttribute("data-bs-dismiss")
  
    useEffect(() => {
      const updated = data?.detail === "Updated";
      if (updated){
        closeRef.current?.click();
        setReload((prev) => {return !prev});
        toast("User Bio Updated.");
      }
    }, [data])
    
    const handleChangeProfile = async (e) => {
      e.target.classList.add("disabled");
      try {
        call({
          "bio": bio,
        })
      } catch (error) {
        console.log(error)
      } 
    }
  
    return (
      <>
        <Modal 
          title={"Change Bio"}
          closeClass="btn btn-outline-danger"
          handleSave={handleChangeProfile}
          saveName="Update Bio"
          saveClass={`flex items-center gap-2 btn-outline-primary ${( bio ) ? "" : "disabled"}`}
          saveIcon={<RiRefreshLine />}
          closeRef={closeRef}
          saveRef={saveRef}
          modalId="change-bio"
        >
  
          {
            error && <p className="text-center text-danger fs-5 mb-3">Bio update failed. {error?.response?.data?.detail}</p>
          }

            <ReactQuill theme="snow" 
                value={bio} 
                onChange={e => {setBio(e)}} 
                />

            {
                loading && <Spinner className="d-block mx-auto my-2" />
            }

        </Modal>
      </> 
    )
  }
  