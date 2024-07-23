import { useEffect } from "react"
import { createPortal } from "react-dom"

const Overlay = ({children}) => {

    useEffect(() => {

        document.getElementById("root").classList.add("d-none");

        return () => {
            document.getElementById("root").classList.remove("d-none");
        }
    }, [])

  return createPortal(
    <div className='min-vh-100 z-50 overscroll-y-none flex items-center justify-center'>
        { children }
    </div>,
    document.getElementById("overlay")
  )
}

export default Overlay