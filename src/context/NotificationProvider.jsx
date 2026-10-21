import { createContext, useContext, useState, useEffect } from "react";
import { NotificationContext } from "./NotificationContext";
export default function NotificationProvider({children}){
    const [message, setMessage]=useState("");
    useEffect(()=>{
        if(message){
            const timer=setTimeout(()=>{
                setMessage("");
            },3000);
            return ()=>clearTimeout(timer);
        }
    },[message]);
    const showNotification=(message)=>{
        setMessage(message);
    }
    return(
        <NotificationContext.Provider value={{message, showNotification}}>
            {children}

            {message && (
                <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300" aria-live="polite">
                    <p className="font-medium">{message}</p>
                </div>
            )}
        </NotificationContext.Provider>
    )
}