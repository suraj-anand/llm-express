import { useNavigate } from "react-router-dom";

export function Logout (setAuthStatus, navigate){
    if(setAuthStatus){
        setAuthStatus(false);
    }
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
}

export function stringHash(string, upperBound=0){
    let hash = 0;
    let bound = upperBound ? upperBound : string.length;
    for (let i = 0; i < string.length; i++){
        hash += string.charCodeAt(i);
    }
    return hash % bound;
}