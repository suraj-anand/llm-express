import Modal from "components/generic/Modal";
import { useAxios } from "hooks";
import { useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";

export default function DeleteProfileImage({ setReload }){

    const {
        call,
        loading,
        data,
        status_code,
        error
    } = useAxios({
        url: `/api/update-profile/`,
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
            toast("Updated User Profile");
            sessionStorage.removeItem("profile")
        }
    }, [data])
    
    const handleChangeProfile = async (e) => {
        e.target.classList.add("disabled");
        try {
            call({
                "delete": true
            })
        } catch (error) {
            console.log(error)
        } 
    }

    return (
    <>

        <Modal 
            modalId="delete-profile"
            title={"Delete Profile Image"}
            saveClass="flex items-center gap-2 btn-outline-danger"
            handleSave={handleChangeProfile}
            saveName="Delete Profile Image"
            closeClass={`btn btn-outline-primary`}   
            saveIcon={<TbTrash />}
            closeRef={closeRef}
            saveRef={saveRef}
            >
        
        <div className="flex flex-col gap-2 my-2">
            <p>Do you really want to delete your profile image ?</p>
            <i>Note: This action is not reversible</i>
        </div>
        {
            error && <p className="text-center text-danger fs-5">Profile update failed.</p>
        }

        {
            loading && <Spinner className="d-block mx-auto" />
        }

        </Modal>
    </> 
    )
}