const Input = ({
    id="",
    className="",
    type="",
    value="",
    onChange = () => {}
}) => {
  return (
    <>
        <input 
            id={id}
            name="name" 
            required 
            className={
                `w-96 border-1 rounded-md py-1.5 border-black-900 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6 ${className}`
            }
            type={type}
            value={value}
            onChange={onChange}
            />
    </>
  )
}

export default Input