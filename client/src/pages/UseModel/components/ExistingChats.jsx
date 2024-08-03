import { tr } from "date-fns/locale";
import { useAxios } from "hooks"
import { useEffect } from "react";
import { Fade, Spinner } from "react-bootstrap";
import { FaWindowMinimize } from "react-icons/fa";
import { Link, NavLink, useParams } from "react-router-dom";

const ExistingChats = ({ showSideChats, setShowSideChats }) => {

    const { modelid } = useParams();

    const {
        data,
        loading,
        error,
        status_code,
        call,
    } = useAxios({
        url: `/api/bedrock/chat/${modelid}/?type=list`,
        method: "GET"
    });

    useEffect(() => {
        call()
    }, [modelid])

    return (
        <Fade in={showSideChats} unmountOnExit={true} mountOnEnter={showSideChats}>
            <div className="w-1/4 border-r" style={{backgroundColor: "rgb(17, 24, 39)"}}>
                
                {/* Chat Sidebar */}
                    <header className="p-4 flex justify-between items-center bg-blue-800 text-white">
                        <h1 className="text-xl font-semibold">{data?.model_name}</h1>
                        <div className="relative">
                            <button id="menuButton" className="focus:outline-none" onClick={() => setShowSideChats(prev => !prev)}>
                                <FaWindowMinimize />
                            </button>
                        </div>
                    </header>
                
                <div className="text-black overflow-y-auto h-screen p-3 mb-9 pb-20">
                    {error && <p className="text-red-600 text-lg text-center">{error?.response?.data?.message}</p>}
                    
                    {
                        loading && <div className="flex justify-center align-center">
                            <Spinner />
                        </div>
                    }


                    {
                        data?.context?.map( prev_chat => (
                            <>
                            {/* Single Chat on side bar */}
                            <NavLink to={`/use-model/${modelid}/${prev_chat.id}`} className="chat-side flex border rounded-2xl items-center mb-4 cursor-pointer hover:bg-blue-800 p-2">
                                <div className="flex-1" >
                                    <h2 className="p-2 text-white text-md font-semibold">{prev_chat?.first_message.substring(0, 200)}</h2>
                                </div>
                            </NavLink>
                            </>
                        ))
                    }
                </div>
            </div>
        </Fade>
    )
}

export default ExistingChats