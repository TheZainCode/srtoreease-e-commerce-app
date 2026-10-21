import { useCart } from "../context/useCart";
function Cart(){
    const {cart, removeFromCart, addToCart, decreaseQuantity, increaseQuantity }=useCart();
    const subTotal=cart.reduce((total, product)=>total + (product.price*product.quantity),0);
    if(cart.length===0){
        return(
          <main className="mx-auto max-w-4xl p-6 items-center text-center">
            <h1 className="font-bold text-3xl mb-3">Shopping Cart</h1>
            <p className="text-gray-600 border border-dotted p-3 text-center rounded-md border-gray-900 text-xl font-semibold">
                Your cart is empty.
            </p>
          </main>
        )
    }
    return(
        <main className="mx-auto max-w-4xl p-6 text-center justify-center items-center">
            <h1 className="mb-6 font-bold text-3xl">Shopping Cart</h1>
            <div className="space-y-4 items-center justify-center">
                {cart.map((product) => (
                    <article className="flex flex-col gap-4 rounded-lg border shadow-md sm:flex-row sm:items-center p-3 items-center" key={product.id}>
                        <img src={product.image}
                        alt={product.title}
                        className="w-24 h-24 object-contain" />
                        <div className="flex-1">
                            <h2 className="font-semibold text-lg">{product.title}</h2>
                            <p className="mt-3 text-blue-600 font-bold">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={()=>decreaseQuantity(product.id)} className="rounded-md px-3 py-2 bg-blue-600 text-white text-center cursor-pointer">-</button>
                            <p className="rounded-md px-3 py-2 bg-green-600 text-white text-center font-semibold">{product.quantity}</p>
                            <button className="rounded-md px-3 py-2 bg-blue-600 text-white text-center cursor-pointer" onClick={()=>increaseQuantity(product.id)}>+</button>
                        </div>
                        <button type="button" onClick={()=>removeFromCart(product.id)} className="rounded-md bg-red-600 text-white px-4 py-2 hover:bg-red-700 cursor-pointer">Remove</button>
                    </article>
                ))}
            </div>
            <section className="mt-8 border-t pt-6 text-right">
                <p className="text-xl font-bold">
                    Subtotal: ${subTotal.toFixed(2)}
                </p>
            </section>
        </main>
    );
}
export default Cart;