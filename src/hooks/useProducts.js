import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
function useProducts(){
    const [error, setError]=useState("");
    const [loading, setLoading]=useState(true);
    const [products, setProduct]=useState([]);

    useEffect(()=>{
        const controller=new AbortController();
        async function fetchProducts(){
            try{
                setLoading(true);
                setError("");
                const data=await getProducts(controller.signal);
                setProduct(data);
            }catch(err){
                if(err.name !== "AbortError"){
                    setError(err.message || "Something went wrong.")
                }
            }finally{
                if(!controller.signal.aborted){
                    setLoading(false);
                }
            }
        }
        fetchProducts();
        return ()=> controller.abort();
    },[]);
    return { products, loading, error };
}
export default useProducts;