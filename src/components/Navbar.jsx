import { NavLink } from "react-router-dom";
import { useCart } from "../context/useCart";
function Navbar(){
    const {cart}=useCart();
    const cartCount=cart.length;
    const linkClass=({isActive}) => 
        `rounded-md px-3 py-2 text-sm font-medium transition ${isActive ? "bg-blue-600 text-white" 
            : "bg-gray-700 text-white hover:bg-gray-100 hover:text-black"
        }`;
        return(
            <nav className="border-b bg-white px-6 py-2">
                <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4">
                    <NavLink to="/" className="text-xl font-bold text-blue-600">ShopDash</NavLink>
                    <div className="flex flex-wrap items-center gap-2">
                        <NavLink to="/" end className={linkClass}>Home</NavLink>
                        <NavLink to="/products" className={linkClass}>Products</NavLink>
                        <NavLink to="/cart" className={linkClass}>Cart ({cartCount})</NavLink>
                        <NavLink to="/login" className={linkClass}>Login</NavLink>
                    </div>
                </div>
            </nav>
        );
}
export default Navbar;