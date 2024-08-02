import { useAxios } from "hooks";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const CreateBedrockModel = ({
    selectedModel,
    topK,
    topP,
    temperature,
    max_tokens,
    is_public,
}) => {

    const {
        call,
        loading, 
        status_code,
        data,
        error
    } = useAxios({
        url: `/api/bedrock/model/`,
        method: "POST",
    });

    async function handleCreateModel(event){
        event.target.classList.add("disabled");
        call({
            "model_id": selectedModel.modelId,
            "model_name": selectedModel.modelName,
            "input_modalities": selectedModel.inputModalities.toString(),
            "output_modalities": selectedModel.outputModalities.toString(),
            "max_tokens": max_tokens,
            "temperature": temperature,
            "top_k": topK,
            "top_p": topP,
            "top_p": max_tokens,
            "is_public": is_public,
        })
    }


    return (
        <>
        {
            loading && <div className="my-4 flex justify-center"><Spinner /></div>
        }

        {
            status_code === 201 && <p className="my-4 text-center text-success text-lg">Model Created successfully, navigate to Use Model to play with your model</p> 
        }

        {
            error && <p className="my-4 text-center text-success text-lg">Unable to create your model, {error?.data?.message}.</p> 
        }
        
        <div className='my-6 text-center'>
            <button className='btn btn-outline-info' onClick={(e) => {handleCreateModel(e)}}>Create Model</button>
        </div>
        </>
    )
}

export default CreateBedrockModel