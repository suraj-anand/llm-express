import axios from "axios";
import { useEffect, useState } from "react"


const GET = "GET"
const POST = "POST"
const PATCH = "PATCH"
const PUT = "PUT"
const DELETE = "DELETE"
const METHODS = [GET, POST, PATCH, PUT, DELETE];

const defaultResponse = {data: [], status: null}
const useAxios = ({url = "", method="GET", headers={}}) => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(defaultResponse);
  
    async function call(payload){
        setLoading(true);
        setError(null);
        setResponse(defaultResponse);
        try {
            if (!METHODS.includes(method.toUpperCase())){
                throw new Error("Invalid method")   
            }
            
            if (method.toUpperCase() === GET){
                const response = await axios.get(url, {headers: headers});
                setResponse(() => (response));
            } 
            else if (method.toUpperCase() === POST) {
                const response = await axios.post(url, {...payload}, {headers: headers});
                setResponse(() => (response));
            } 
            else if (method.toUpperCase() === PUT) {
                const response = await axios.put(url, payload, {headers: headers});
                setResponse(() => (response));
            }
            else if (method.toUpperCase() === PATCH) {
                const response = await axios.patch(url, payload, {headers: headers});
                setResponse(() => (response));
            }
            else if (method.toUpperCase() === DELETE) {
                const response = await axios.delete(url, {headers: headers});
                setResponse(() => (response));
            }
        } catch (error) {
            console.error(error);
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    
    return {
        call,
        data: response.data,
        status_code: response.status,
        loading,
        error
    }
}

export default useAxios