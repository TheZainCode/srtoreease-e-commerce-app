import { CartContext } from "./CartContext";
import CartProvider from "./CartProvider";
import { useState, useContext, createContext } from "react";
export function useCart(){
    const context=useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used within cartProvider");
    }
    return context;
}