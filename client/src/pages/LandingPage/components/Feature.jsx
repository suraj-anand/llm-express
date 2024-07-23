import { Button, Img, Text } from "components"
import { Link } from "react-router-dom"
import Greet from "./Greet"
import { useContext } from "react"
import { AuthContext } from "context/AuthContext"

const HomeSection = () => {
    const { authStatus } = useContext(AuthContext)
    return (
    <>
    <div className="flex flex-col justify-center min-h-[84vh] bg-gray-900">
        
        <div className="container flex gap-32 justify-evenly">
            <Img src="assets/img_brand_1.svg" alt="brandone_one" />
            <Img src="assets/img_blog_1.svg" alt="blogone_one"  />
        </div>

        <div className="px-10 flex flex-col justify-center align-center mx-auto">
            <div className="flex justify-center">
                {
                    authStatus ?
                    <Greet />
                    :
                    <p className="text-center text-[48px] fw-bold text-green-500">
                        <span className="text-green-500">Highly Customizable</span> General purpose 
                        <span className="text-blue-600"> Gen-AI</span> application
                    </p>
                }
            </div>
            
            <div className="flex justify-center text-white">
                <p className=" fs-4 text-center leading-[35px] my-4 w-[60%]">
                    Use and test the potential of both <i className="fw-bold">open-source Gen-AI models from HuggingFace</i> and models provided from <i className="fw-bold">Bedrock (AWS Service)</i>.
                </p>
            </div>
        </div>
        
        {
            !authStatus &&
            <div className="flex flex-row gap-2 justify-center">
                <Link to="/login" className="btn btn-lg btn-primary rounded-pill px-8 py-2">Login</Link>
                <Link to="/register" className="btn btn-lg btn-outline-success rounded-pill">Create Account</Link>
            </div>
        }
    </div>
    </>
  )
}

export default HomeSection