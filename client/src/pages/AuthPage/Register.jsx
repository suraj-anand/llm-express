import { NavLink, useNavigate } from "react-router-dom"
import { Logo } from "components"
import { useContext, useEffect, useState } from "react"
import { useAxios } from "hooks"
import Input from "./components/Input"
import { Spinner } from 'react-bootstrap'
import { AuthContext } from "context/AuthContext"
import FileUpload from "components/shared/FileUpload"
import { ToastContainer } from 'react-toastify'

const Register = () => {
    
    const navigate = useNavigate();

    const { authStatus, setAuthStatus } = useContext(AuthContext)
    
    // States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState();
    
    const {
        data, loading, error, status_code, call
    } = useAxios({
        url: "/api/register/",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    
    useEffect(() => {
        if ([200, 201].includes(status_code)) {
            localStorage.setItem("user_id", data?.user_id);
            localStorage.setItem("user_name", data?.user_name);
            setAuthStatus(true);
            navigate("/");
        }
    }, [status_code])

    useEffect(() => {
        if(authStatus){
            navigate("/")
        }
    }, [])

    // Submit event handler
    async function handleRegister(event){
        event.preventDefault();
        const payload = {
            name,
            email,
            password,
            file
        }
        call(payload)
    }

    return (
    <>
        <h1 className='text-2xl font-bold uppercase p-4'>
            <Logo />
        </h1>
        
        <div className="container flex h-[90vh] flex-col items-center justify-center px-2 py-2 my-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Create new account
                </h2>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6 flex flex-col items-center" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">Your Full Name</label>
                        <div className="mt-2">
                        <Input 
                            id="name" 
                            type="text" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }} />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
                        <div className="mt-2">
                        <Input 
                            id="email" 
                            type="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </div>
                    </div>

                <div className="flex flex-col ">
                    <div className="m">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
                    </div>
                    <div className="mt-2">
                        <Input 
                            id="email" 
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            />
                    </div>
                </div>

                <FileUpload 
                    file={file} setFile={setFile}
                    className="w-auto items-center justify-center mx-auto inline my-2"
                    type="profile image" />

                {/* Spinner */}
                <div className="flex justify-center">
                    {loading && <Spinner className="text-slate-900" />}
                </div>

                {/* Error */}
                <p className="my-2 capitalize text-center text-red-700">
                    {error?.response?.data?.detail} 
                </p>

                <div>
                    <button type="submit" 
                        className="flex w-96 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Register
                        </button>
                </div>
                </form>

                <p className="text-center text-sm text-white my-3">
                    Existing User?
                    <NavLink to="/login" className="font-semibold mx-1 leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
        <ToastContainer 
            theme="dark" />
    </>
  )
}

export default Register