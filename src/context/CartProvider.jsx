import { useState, createContext, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import  useNotification  from "./useNotification"; 
export default function CartProvider({ children }) {
    const { showNotification } = useNotification();
    
    const [cart, setCart] = useState(() => {
        try {
            const savedCarts = localStorage.getItem("cart");
            return savedCarts ? JSON.parse(savedCarts) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const isExisting = cart.some((item) => item.id === product.id);

        if (isExisting) {
            showNotification("Product is already added to cart.");
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            showNotification("Product added to cart");
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const increaseQuantity = (productId) => {
        setCart(
            cart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const decreaseQuantity = (productId) => {
        setCart(
            cart
                .map((item) => {
                    if (item.id === productId) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}