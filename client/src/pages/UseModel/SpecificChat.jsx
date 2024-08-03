import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ExistingChats from './components/ExistingChats';
import Conversations, { AssistantChat } from './components/Conversations';
import { IoSend } from 'react-icons/io5';
import { TbCaretRightFilled, TbDotsVertical, TbTrash, TbPlus } from "react-icons/tb";
import axios from 'axios';
import Modal from 'components/generic/Modal';
import { ToastContainer, toast } from "react-toastify";

const SpecificChat = () => {

    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");
    const [ showSideChats, setShowSideChats ] = useState(true);
    const { modelid, chatid } = useParams();
    const [ chat_history, setChatHistory ] = useState([]);
    const [ prompt, setPrompt ] = useState("");
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState("");
    const [ refresh, setRefresh ] = useState("");

    async function handleSend(event){
        setLoading(true);
        setChatHistory(chathistory => ([...chathistory, {"role": "user", "content": prompt}]))
        try {
            const response = await axios.put(`/api/bedrock/chat/${modelid}/`, {
                "chat_id": chatid,
                "prompt": prompt
            });
            setChatHistory(chathistory => ([...chathistory, {"role": "assistant", "content": response.data?.content}]))
        }   catch (error) {
            const err_message = error?.response?.data?.message + " " + error?.response?.data?.error;
            setError(err_message);
        } finally {
            setLoading(false);
            setPrompt("")
        }
    }

    async function handleDelete(event){
        setLoading(true);
        try {
            const response = await axios.delete(`/api/bedrock/chat/${modelid}/?chat_id=${chatid}&user_id=${user_id}`);
            if([200,201,202,203,204].includes(response.status)){
                navigate(`/use-model/${modelid}`)
            }
        }   catch (error) {
            setError(err_message);
        } finally {
            setLoading(false);
            setPrompt("")
        }
    }

    async function handleCreateChat(){
        try{
            const response = await axios.post(`/api/bedrock/chat/${modelid}/`);
            const chat_id = response.data?.chat_id;
            setRefresh(p => (!p))
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
            
            <ExistingChats refresh={refresh} showSideChats={showSideChats} setShowSideChats={setShowSideChats} />
            { 
                !showSideChats && <button onClick={() => {setShowSideChats(p => !p)}}  className='absolute flex z-50 p-3'><TbCaretRightFilled className='text-white' size={36} /></button>
            }

            <div className="flex-1">
                <div className="dropdown show">
                    <button className='flex ms-auto p-2' data-bs-toggle="dropdown"><TbDotsVertical size={36} /></button>
                    <div id="chat-options" className="dropdown-menu">
                        <button className="dropdown-item" onClick={handleCreateChat}>
                            <span className='flex gap-2 items-center text-blue-600'><TbPlus size={26}/> Create New Chat</span>
                        </button>
                        


                        <button className="dropdown-item" data-bs-target="#delete-chat" data-bs-toggle="modal">
                            <span className='flex gap-2 items-center text-red-600'><TbTrash size={26}/> Delete</span>
                        </button>
                    </div>
                </div>
                <div className="h-[92%] overflow-y-auto p-4">
                    <Conversations chat_history={chat_history} setChatHistory={setChatHistory} _loading={loading} />
                    { error && <AssistantChat message={error} />}
                </div>

                x
                
                <footer className={`border-t border-gray-300 p-2 absolute bottom-0 w-3/4 ${!showSideChats ? "!w-[95%] !mx-auto mb-4 left-1 right-1 rounded-lg !border" : "bg-white"}`}>
                    <div className="flex items-center">
                        <input 
                            placeholder="Type a message..." 
                            type="text" 
                            className="token-input w-full p-2 rounded-md border-md border-green-400 focus:outline-none focus:border-green-500"  
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value)}
                            }
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    handleSend(e)
                                }
                            }}
                            />
                            
                        <button 
                            onClick={handleSend}
                            className="bg-green-500 text-white px-3 py-2 rounded-md ml-2">
                                <IoSend />
                        </button>
                    </div>
                </footer>

                {/* Delete Confirmation */}
                <Modal
                    title={"Delete Chat ?"}
                    closeClass="btn btn-primary"
                    handleSave={handleDelete}
                    saveName="Delete"
                    saveClass='flex items-center gap-2 btn btn-outline-danger'
                    saveIcon={<TbTrash />}
                    modalId="delete-chat">
                        <p>Are you sure that you want to delete your chats ?</p>
                        <i>Note: This action is not reversible</i>
                </Modal>
            </div>
        </div>
        <ToastContainer theme="dark" />
        </>
    )
}

export default SpecificChat