import Navbar from 'components/shared/Navbar';
import React, { useState } from 'react'
import { AWS, HUGGING_FACE } from "utils/constants"
import { SelectBedrockModel } from './components/SelectBedrockModel';

const Deploy = () => {
    
    const [type, setType] = useState("");

    return (
        <>
        <Navbar type="back" />
        <div className="container">
            <div className="flex justify-center my-4">
                <div className="flex items-center px-6 border border-gray-200 rounded dark:border-gray-700 mx-2">
                    <input id="hugging-face" type="radio" value={HUGGING_FACE} name="type-selection" className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={e => setType(e.target.value)}/>
                    <label for="hugging-face" className="py-3 ms-2 dark:text-gray-300 text-lg">Hugging Face</label>
                </div>
                <div className="flex items-center px-12 py-2 border border-gray-200 rounded dark:border-gray-700">
                    <input id="bedrock" type="radio" value={AWS} name="type-selection" className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={e => setType(e.target.value)} />
                    <label for="bedrock" className="py-3 ms-2 dark:text-gray-300 text-lg">Bedrock</label>
                </div>
            </div>
            <div className="w-[80%] mx-auto mt-2">
                <SelectBedrockModel show={type === AWS} />
            </div>
        </div>
        </>
    )
}

export default Deploy