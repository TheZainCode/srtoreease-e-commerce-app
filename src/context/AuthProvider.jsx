import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
export default function AuthProvider({children}){
    const [ user, setUser ]=useState(()=>{
        try{
        const storedUser=localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
        }catch(error){
            console.error("Failed to parse user from localStorage:", error);
            return null;
        }
    });
    useEffect(()=>{
        if(user){
            localStorage.getItem("user");
            localStorage.setItem("user", JSON.stringify(user));
        }else{
            localStorage.removeItem("user");
        }
    }, [user]);
    const login=(userData)=>{
        const defaultUser={name: "Zain", role: "Customer"};
        setUser(userData || defaultUser);
    }
    const logout=()=>{
        setUser(null);
    }
    const isAuthenticated=Boolean(user);
    return(
        <AuthContext.Provider value={{user, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}