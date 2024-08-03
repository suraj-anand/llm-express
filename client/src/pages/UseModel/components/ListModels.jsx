import { useAxios } from "hooks"
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    
    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <p className="text-danger">{error}</p>
    }

    return (
        <>
        <table className="table align-middle table-hover">
            <thead className="table-secondary">
                <tr>
                    <th>#</th>
                    <th>Model Name</th>
                    <th>Created On</th>
                    <th>Input Modalities</th>
                    <th>Output Modalities</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {data?.map( (model, idx) => {
                    return (
                        <>
                            <tr>
                                <td>{idx+1}</td>
                                <td>{model.model_name}</td>
                                <td>{model.created_time}</td>
                                <td>{model.input_modalities}</td>
                                <td>{model.output_modalities}</td>
                                <td>
                                    <Link to={`/use-model/${model.id}`} className="btn btn-primary">Use Model</Link>
                                </td>
                            </tr>
                        </>
                    )
                })}
            </tbody>
        </table>
        </>
    )   
}

export default ListModels