import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
function ProductDetails(){
    const { id }=useParams();
    const { products, error, loading }=useProducts();

    if(loading){
        return <Loading message="Loading Product..." />
    }

    if(error){
        return <ErrorMessage />
    }

    const product=products.find((item) => item.id==id);
    if(!product){
        return <p className="p-4 border border-dotted border-gray-600 rounded-md text-lg text-center m-4 shadow-md">Product not found</p>
    }
    if(product){
        return(
            <main className="p-6 mx-auto max-w-6xl">
                <article className="border rounded-md bg-white transition shadow-sm hover:shadow-md p-6 flex flex-col gap-3 justify-center items-center max-w-2xl mx-auto w-100 text-center">
                    <img src={product.image} className="w-full h-40 object-contain"/>
                    <h2 className="font-bold text-lg">{product.title}</h2>
                    <p className="mt-2">{product.description}</p>
                    <p className="font-semibold mt-2 text-black">Category: {product.category}</p>
                    <p className="mt-2 font-bold text-blue-600">${product.price.toFixed(2)}</p>
                </article>
            </main>
        )
    }
}
export default ProductDetails;