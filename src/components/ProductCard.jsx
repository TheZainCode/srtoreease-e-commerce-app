import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";
function ProductCard({ product }){
    const { cart, addToCart, removeFromCart }=useCart();
    return(
        <article className="rounded-lg border bg-white p-4 transition shadow-sm hover:shadow-md h-full flex flex-col justify-between">
            <Link to={`/products/${product.id}`}>
            <img src={product.image} className="mx-auto mb-4 h-40 w-full object-contain" />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="mt-2 font-bold text-blue-600">
                ${product.price.toFixed(2)}
            </p>
            </Link>
            <button type="button"
            onClick={()=>addToCart(product)}
            className="w-full rounded-md bg-blue-600 text-white mt-3 px-3 py-2 cursor-pointer hover:bg-blue-700">Add to Cart</button>
        </article> 
    );
}
export default ProductCard;