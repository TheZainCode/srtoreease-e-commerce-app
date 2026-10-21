import { AuthContext } from "./AuthContext";
import { useContext } from "react";
export function useAuth(){
    const info=useContext(AuthContext);
    if(!info){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return info;
}