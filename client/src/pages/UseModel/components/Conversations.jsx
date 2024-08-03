import ProfileIcon from "components/generic/ProfileIcon";
import Typing from "components/generic/Typing";
import { useAxios } from "hooks"
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { GoDependabot } from "react-icons/go";
import { useParams } from "react-router-dom";

const Conversations = ({ chat_history, setChatHistory, _loading }) => {
    
    const { modelid, chatid } = useParams();

    const {
        data,
        loading,
        error,
        status_code,
        call,
    } = useAxios({
        url: `/api/bedrock/chat/${modelid}/?chat_id=${chatid}`,
        method: "GET"
    });    

    useEffect(() => {call()}, [chatid])

    useEffect(() => {
        setChatHistory(() => (data?.chat_history))
    }, [data])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-100">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="">
            {
                chat_history?.map(chat => (
                    <>
                        { chat?.role === "user" ? 
                                <UserChat message={chat?.content} />
                            : <AssistantChat message={chat?.content} />
                        }
                    </>
                ))
            }
            
            {
                _loading &&
                <div className="flex align-center my-auto">
                    <GoDependabot className="w-8 h-8 rounded-full" />
                    <Typing />
                </div>
            }
        </div>
    )
}

export function UserChat({message=""}){
    return (
        <div className="flex justify-end mb-10 cursor-pointer">
            <div className="flex max-w-96 bg-green-500 text-white rounded-lg p-3 gap-3">
                <p>{ message }</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                <ProfileIcon size={30} />
            </div>
        </div>
    )
}

export function AssistantChat({message=""}){
    const msg = `${message.replace('\n', '<br>')}`;
    return (
        <div className="flex mb-12 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <GoDependabot className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p className="text-gray-700"><span dangerouslySetInnerHTML={{__html: msg}}></span></p>
            </div>
        </div>
    )
}

export default Conversations