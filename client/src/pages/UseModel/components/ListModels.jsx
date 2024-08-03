import axios from "axios";
import { useAxios } from "hooks"
import { func } from "prop-types";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { YOUR_MODELS } from "../UseModels";
import Modal from "components/generic/Modal";
import { formatDistance } from 'date-fns'

const ListModels = ({ type }) => {
    
    const {
        call,
        loading,
        data,
        error
    } = useAxios({
        url: `/api/bedrock/model/?type=${type}`,
        method: "GET",
    });   

    useEffect(() => {call()}, [type])
    
    async function handleModeldelete(e, model_id){
        const resp = await axios.delete(`/api/bedrock/model/?model_id=${model_id}`);
        if (resp.status === 204){
            toast("Model Deleted");
        }
        call();
    }

    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <p className="text-danger">{error}</p>
    }

    return (
        <>
        <table className="table table-dark align-middle table-hover">
            <thead className="align-middle !bg-green-600">
                <tr className="!bg-green-600" id="tb-head">
                    <th>#</th>
                    <th>Model Name</th>
                    <th>Created On</th>
                    <th>Input Modalities</th>
                    <th>Output Modalities</th>
                    <th>#</th>
                    {type === YOUR_MODELS && <th>#</th>}
                </tr>
            </thead>
            <tbody>
                {data?.map( (model, idx) => {
                    return (
                        <>
                            <tr>
                                <td>{idx+1}</td>
                                <td>{model.model_name}</td>
                                <td>{formatDistance(new Date(model.created_time), new Date(), { addSuffix: true })}</td>
                                <td>{model.input_modalities}</td>
                                <td>{model.output_modalities}</td>
                                <td>
                                    <Link to={`/use-model/${model.id}`} className="btn btn-primary">Use Model</Link>
                                </td>
                                {
                                    type === YOUR_MODELS &&
                                    <td>
                                        <button className="text-red-500" data-bs-target={`#delete-model-${model.id}`} data-bs-toggle="modal"><TbTrash size={26} /></button>
                                    </td>
                                }
                            </tr>

                        {/* Delete Confirmation */}
                        <Modal
                            title={"Delete Model ?"}
                            closeClass="btn btn-primary"
                            handleSave={(e) => {handleModeldelete(e, model.id)}}
                            saveName="Delete"
                            saveClass='flex items-center gap-2 btn btn-outline-danger'
                            saveIcon={<TbTrash />}
                            modalId={`delete-model-${model.id}`}>
                                <p>Are you sure that you want to delete the model {model.model_name} ?</p>
                                <i>Note: This action is not reversible</i>
                        </Modal>
                        </>
                    )
                })}
            </tbody>
        </table>

        <ToastContainer />
        </>
    )   
}

export default ListModels