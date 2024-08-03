import { NavLink } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { Offcanvas } from 'components/shared/Offcanvas';
import Back from 'components/mini/Back';

const Navbar = ({ showOptions=true, type="search", handleSearchClick = () => {} }) => {
    return (
        <nav className="navbar bg-gray-900">
            <div className="container my-2 py-2">
                            
                {/* Icon */}
                <div className="w-100 d-flex justify-content-center text-blue-700">

                    <div className='flex-item me-auto'>
                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#side-drawer" className='text-2xl font-bold uppercase'>LLM Express</button>
                        <Offcanvas id="side-drawer" />
                    </div>

                    {
                        showOptions &&
                        <div className="d-none d-lg-flex gap-5 flex-item nav-items">
                            <NavLink to="/tokens" className="text-lg font-bold text-green-500">Tokens</NavLink>
                            <NavLink to="/deploy-model" className="text-lg font-bold text-green-500">Deploy</NavLink>
                            <NavLink to="/fine-tune" className="text-lg font-bold text-green-500">Fine Tune</NavLink>
                            <NavLink to="/use-model" className="text-lg font-bold text-green-500">Use Model</NavLink>
                        </div>
                    }

                    {/* Search */}
                    <div className="flex-item ms-auto">
                    {
                        type === "search" &&
                            <button onClick={handleSearchClick}><IoIosSearch fontSize={36} /></button>
                        }

                    {/* Back */}
                    {
                        type === "back" &&
                            <Back />
                    }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;