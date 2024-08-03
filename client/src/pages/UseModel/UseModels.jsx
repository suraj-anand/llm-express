import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import Navbar from "components/shared/Navbar"
import ListModels from "./components/ListModels"

export const YOUR_MODELS = "your-models";
export const PUBLIC_MODELS = "public-models";
const UseModel = () => {

    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ type, setType ] = useState(() => {
        if (![YOUR_MODELS, PUBLIC_MODELS].includes(searchParams.get("type"))){
            setSearchParams(params => {
                params.set("type", YOUR_MODELS);
                return params;
            });
            return YOUR_MODELS;
        } else {
            return searchParams.get("type")
        }
    });

    function handleTypeChange(event){
        setType(event.target.value);
        setSearchParams(params => {
            params.set("type", event.target.value);
            return params;
        });
    }

    return (
        <>
            <Navbar type="back" />

            {/* Type Change */}
            <div className="flex justify-end p-3">
                <select className="form-select w-[10rem]" defaultValue={type} onChange={handleTypeChange}>
                    <option selected value={YOUR_MODELS}>Your Models</option>
                    <option value={PUBLIC_MODELS}>Public Models</option>
                </select>
            </div>

            <ListModels type={type} />
        </>
    )
}

export default UseModel