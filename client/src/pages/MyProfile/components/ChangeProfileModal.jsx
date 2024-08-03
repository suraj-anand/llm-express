import Modal from "components/generic/Modal";
import FileUpload from "components/shared/FileUpload";
import { useAxios } from "hooks";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { RiRefreshLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";

export default function ChangeProfileModal({ setReload }){

    const [ file, setFile ] = useState(null);
    const {
      call,
      loading,
      data,
      status_code,
      error
    } = useAxios({
      url: `/api/update-profile/`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  
    const saveRef = useRef();
    const closeRef = useRef();
    saveRef.current?.removeAttribute("data-bs-dismiss")
  
    useEffect(() => {
      const updated = data?.detail === "Updated";
      if (updated){
        closeRef.current?.click();
        setReload((prev) => {return !prev});
        toast("Updated User Profile");
        sessionStorage.removeItem("profile")
        setFile(null);
      }
    }, [data])
    
    const handleChangeProfile = async (e) => {
      e.target.classList.add("disabled");
      try {
        call({
          file: file
        })
      } catch (error) {
        console.log(error)
      } 
    }
  
  
    return (
      <>
  
        <Modal 
          title={"Change Profile"}
          closeClass="btn btn-outline-danger"
          handleSave={handleChangeProfile}
          saveName="Update Profile"
          saveClass={`flex items-center gap-2 btn-outline-primary ${file ? "" : "disabled"}`}
          saveIcon={<RiRefreshLine />}
          closeRef={closeRef}
          saveRef={saveRef}
        >
  
          {
            error && <p className="text-center text-danger fs-5">Profile update failed.</p>
          }
  
          {
            loading && <Spinner className="d-block mx-auto" />
          }
          <FileUpload 
              file={file} setFile={setFile}
              type="profile image" />
        </Modal>
      </> 
    )
  }
  