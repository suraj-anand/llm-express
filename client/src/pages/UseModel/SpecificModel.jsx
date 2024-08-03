import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ExistingChats from './components/ExistingChats';
import { TbCaretRightFilled, TbPlus } from 'react-icons/tb';
import axios from 'axios';

const SpecificModel = () => {
    
    const navigate = useNavigate();
    const { modelid } = useParams();
    const [ showSideChats, setShowSideChats ] = useState(true);
    
    async function handleCreateChat(){
        try{
            const response = await axios.post(`/api/bedrock/chat/${modelid}/`);
            const chat_id = response.data?.chat_id;
            if (chat_id){
                navigate(`/use-model/${modelid}/${chat_id}`)
            }
        }
        catch(error){

        }
    }

    return (
        <>
        <div className="flex h-screen overflow-hidden">
        <ExistingChats showSideChats={showSideChats} setShowSideChats={setShowSideChats} />
        { 
            !showSideChats && <button onClick={() => {setShowSideChats(prev => !prev)}} className='absolute flex z-50 p-3'><TbCaretRightFilled className='text-white' size={36} /></button>
        }
        
        <div className="flex-1">
            <div className="flex items-center justify-center h-screen overflow-y-auto p-4 pb-36">
                <button className='text-green-500 border-2 border-green-800 rounded-full p-2' onClick={() => {handleCreateChat()}}><TbPlus size={42} /></button>
            </div>
        </div>
    </div>
    </>
    )
}

export default SpecificModel