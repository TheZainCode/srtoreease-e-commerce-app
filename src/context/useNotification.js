import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";
export default function useNotification(){
    const notification=useContext(NotificationContext);
    if(!notification){
        throw new Error("useNotification must be used in Notification Provider");
    }
    return notification;
}