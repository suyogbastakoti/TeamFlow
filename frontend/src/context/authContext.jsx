import { createContext, useContext, useState } from "react";

//Create a place where authentication information can be shared.
const AuthContext = createContext();

export const AuthProvider = ({ children })=>{
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    return(
        
        // container that provides the shared data.

        <AuthContext.Provider value={{
            token,
            setToken
            }
        }>
            {children}

        </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    return useContext(AuthContext);
};
