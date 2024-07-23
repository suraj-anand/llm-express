import { useState } from "react";
import { Fade } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = ({ show }) => {
    
    const navigate = useNavigate();

    const [ filter, setFilter ] = useState("");
    const [ query, setQuery ] = useState("") 

    function handleSearch(){
        navigate(`/search/?query=${query}&type=${filter}`);
        console.log("fetch")
    }

    function handleKeyPress(e){
        if (e.key === "Enter") 
            handleSearch()
    }

    return (
    <Fade in={show} unmountOnExit={show}>
        <div
            className="flex justify-center input-group px-2 position-absolute w-100 z-50"
            style={{ top: 100 }}
        >
            <input
                type="text"
                name="search"
                id="search"
                className="form-control rounded-2xl max-w-4xl"
                autoComplete="off"
                value={query}
                onChange={(e) => (setQuery(e.target.value))}
                onKeyDown={handleKeyPress}
            />
            <button
                className="input-group-text btn !bg-gray-600_01 text-white hover:!text-black-900 hover:!bg-lime-300"
                type="button"
                data-bs-toggle="dropdown">
                {filter.charAt(0).toLocaleUpperCase() + filter.slice(1)}
            </button>
            <ul className="dropdown-menu">
            <li>
                <button onClick={() => { setFilter("");}} className="dropdown-item">  </button>
            </li>
            <li>
                <button onClick={() => { setFilter(""); }} className="dropdown-item">  </button>
            </li>
            </ul>
            <button className="input-group-text btn btn-dark rounded-2xl" onClick={handleSearch}>
                <FaSearch />
            </button>
        </div>
    </Fade>
    );
};

export default Search;
