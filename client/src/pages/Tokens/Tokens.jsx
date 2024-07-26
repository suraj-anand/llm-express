import { useEffect, useState } from "react"
import { useAxios } from "hooks"
import { Spinner } from "react-bootstrap"
import Navbar from "components/shared/Navbar"
import { AWS, HUGGING_FACE } from "utils/constants"
import axios from "axios"


const DEFAULT_TOKEN = "**********************************";
const Tokens = () => {
    
    const { call, data, loading, error} = useAxios({url: "/api/user-secrets/"})
    const [ secretType, setSecretType ] = useState("");
    const [ hugging_face_token, set_hugging_face_token ] = useState("");
    const [ aws_access_key, set_aws_access_key ] = useState("");
    const [ aws_secret_access_key, set_aws_secret_access_key ] = useState("");
    const [ _loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState("");
    const [ _error, setError ] = useState("");
    
    useEffect(() => {call()}, [])

    useEffect(() => {
        if(data?.hugging_face_token){
            set_hugging_face_token(DEFAULT_TOKEN);
        } 
        if(data?.aws_access_key && data?.aws_secret_access_key) {
            set_aws_access_key(DEFAULT_TOKEN);
            set_aws_secret_access_key(DEFAULT_TOKEN);
        }
    }, [data])

    function handleSecretTypeChange(event){
        setSecretType(event.target.value)
    }

    async function handleUpdateToken(event){
        setSuccess("")
        setError("")
        setLoading(true);
        if(secretType === HUGGING_FACE){
            try {
                const response = await axios.post("/api/user-secrets/", {
                    "type": secretType,
                    "token": hugging_face_token
                })
                if([200,201].includes(response.status)){
                    setError("");
                    setSuccess("hugging_face_token has been updated successfully");
                    set_hugging_face_token(DEFAULT_TOKEN)
                } else {
                    setError(`Failed: ${response.data?.message}`);
                }
            } catch(error){
                console.log(error?.response?.data?.message)
                setError(`Failed: ${error?.response?.data?.message}`);
            }
            
        } else {

        }
        setLoading(false);
    }

    if (loading) {
        return (
            <>
                <Spinner />
            </>
        )
        
    }

    return (
        <>
            <Navbar type="back" />
            <div className="container">
                
                {/* Type Selection */}
                <div className="text-center fs-5 mt-4"><p>Please select token type</p></div>
                <div className="flex justify-center my-4">
                    <div className="flex items-center px-6 border border-gray-200 rounded dark:border-gray-700 mx-2">
                        <input id="hugging-face" type="radio" value={HUGGING_FACE} name="type-selection" className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={e => handleSecretTypeChange(e)}/>
                        <label for="hugging-face" className="py-4 ms-2 dark:text-gray-300 text-lg">Hugging Face</label>
                    </div>
                    <div className="flex items-center px-12 py-2 border border-gray-200 rounded dark:border-gray-700">
                        <input id="bedrock" type="radio" value={AWS} name="type-selection" className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={e => handleSecretTypeChange(e)} />
                        <label for="bedrock" className="py-4 ms-2 dark:text-gray-300 text-lg">Bedrock</label>
                    </div>
                </div>

                {/* Hugging Face Token */}
                {
                    secretType === HUGGING_FACE &&
                    <div className="mt-16">
                        <label for="hf-token" className="text-center block mb-2 text-xl font-medium">Hugging Face Token</label>
                        <input type="text" id="hf-token" 
                            className="mt-3 block mx-auto w-[75%] p-2 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-blue-500 focus:border-blue-500" 
                            value={hugging_face_token}
                            onChange={(e) => {set_hugging_face_token(e.target.value)}}
                            />
                    </div>
                }

                {
                    secretType === AWS &&
                    <div className="mt-16">
                        <label for="aws_access_key" className="text-center block mb-2 text-xl font-medium">AWS Access Key</label>
                        <input type="text" id="aws_access_key" 
                            className="mt-3 block mx-auto w-[75%] p-2 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-blue-500 focus:border-blue-500" 
                            value={aws_access_key}
                            onChange={(e) => {set_aws_access_key(e.target.value)}}
                            />

                        <label for="aws_secret_access_key" className="mt-12 text-center block mb-2 text-xl font-medium">AWS Secret Access Key</label>
                        <input type="text" id="aws_secret_access_key" 
                            className="mt-3 block mx-auto w-[75%] p-2 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-blue-500 focus:border-blue-500" 
                            value={aws_secret_access_key}
                            onChange={(e) => {set_aws_secret_access_key(e.target.value)}}
                            />
                    </div>
                }


                { _loading && <div className="text-center my-4"><Spinner /></div>}
                { success && <p className="text-xl text-center my-16 text-success">{success}</p> }
                { _error && <p className="text-xl text-center my-16 text-danger">{_error}</p> }

                <div className="flex my-12 justify-center">
                    {
                        ( secretType === HUGGING_FACE && hugging_face_token !== DEFAULT_TOKEN && hugging_face_token ) && 
                            <button className="btn btn-lg btn-outline-primary" onClick={handleUpdateToken}>
                                { data?.hugging_face_token ? "Update Token" : "Save Token"}
                            </button>
                    }

                    {
                        ( secretType === AWS && aws_access_key !== DEFAULT_TOKEN && aws_secret_access_key !== DEFAULT_TOKEN && aws_access_key && aws_secret_access_key ) && 
                        <button className="btn btn-lg btn-outline-primary" onClick={handleUpdateToken}>
                            { data?.aws_access_key && data?.aws_secret_access_key ? "Update Token" : "Save Token"}
                        </button>
                    }
                </div>

            </div>
        </>
    )
}

export default Tokens