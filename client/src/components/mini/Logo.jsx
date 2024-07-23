import { useNavigate } from "react-router-dom"

export const Logo = ({...rest}) => {
  
  const navigate = useNavigate();
  
  return (
    <button onClick={() => {navigate("/")}} {...rest}>
      <h1 className='text-2xl font-bold uppercase text-green-500'>LLM EXPRESS</h1>
    </button>
  )
}