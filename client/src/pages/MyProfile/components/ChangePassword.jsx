import Modal from "components/generic/Modal";
import FileUpload from "components/shared/FileUpload";
import { useAxios } from "hooks";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { RiRefreshLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function ChangePassword({ setReload }){

    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const {
      call,
      loading,
      data,
      error
    } = useAxios({
      url: `/api/update-password/`,
      method: "POST",
    });
  
    const saveRef = useRef();
    const closeRef = useRef();
    saveRef.current?.removeAttribute("data-bs-dismiss")
  
    useEffect(() => {
      const updated = data?.detail === "Updated";
      if (updated){
        closeRef.current?.click();
        setReload((prev) => {return !prev});
        toast("Password Updated.");
        setPassword("");
        setConfirmPassword("");
      }
    }, [data])
    
    const handleChangeProfile = async (e) => {
      e.target.classList.add("disabled");
      try {
        call({
          "password": password,
          "confirm_password": confirmPassword
        })
      } catch (error) {
        console.log(error)
      } 
    }
  
    return (
      <>
        <Modal 
          title={"Change Password"}
          closeClass="btn btn-outline-danger"
          handleSave={handleChangeProfile}
          saveName="Change Password"
          saveClass={`flex items-center gap-2 btn-outline-primary ${( password && confirmPassword && password === confirmPassword ) ? "" : "disabled"}`}
          saveIcon={<RiRefreshLine />}
          closeRef={closeRef}
          saveRef={saveRef}
          modalId="change-password"
        >
  
          {
            error && <p className="text-center text-danger fs-5 mb-3">Password update failed. {error?.response?.data?.detail}</p>
          }

          <input 
            type="password" 
            name="password" 
            id="password"
            className="rounded-lg p-2 form-control"
            placeholder="New Password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
             />

          <input 
            type="password" 
            name="confirm-password" 
            id="confirm-password"
            className="my-3 rounded-lg p-2 form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value)}}
             />

          {
            ( password && confirmPassword && password !== confirmPassword ) &&
             <p className="my-2 text-center text-red-700">Passwords doesn't match</p>
          }

          {
            loading && <Spinner className="d-block mx-auto my-2" />
          }

        </Modal>
      </> 
    )
  }
  