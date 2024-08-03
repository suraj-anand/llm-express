import { Route, Routes } from 'react-router-dom'
import UseModels from './UseModels'
import SpecificModel from './SpecificModel'
import SpecificChat from './SpecificChat'

const UseModel = () => {
    return (
        <>
            <Routes>
                <Route path="" element={<UseModels />} />
                <Route path="/:modelid" element={<SpecificModel />} />
                <Route path="/:modelid/:chatid" element={<SpecificChat />} />
            </Routes>
        </>
    )
}

export default UseModel