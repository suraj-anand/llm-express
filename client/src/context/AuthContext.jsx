import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [ authStatus, setAuthStatus ] = useState(true);

    return (
        <AuthContext.Provider value={{
            authStatus, setAuthStatus,
            }}>
            {children}
        </AuthContext.Provider>
    )
} 
