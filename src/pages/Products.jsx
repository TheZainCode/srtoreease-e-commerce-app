import { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
function Products(){
    const { products = [], loading, error}=useProducts();
    const[search, setSearch]=useState("");
    const [category, setCategory]=useState("all");
    const [sortOrder, setSortOrder]=useState("default");
    const [maxPrice, setMaxPrice]=useState("");
    const categories=products ? [
        ...new Set(products.map((product) => product.category))
    ]: [];
    const filteredProducts=products.filter((product) => {
        const matchesSearch=product.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory=category==="all" || product.category===category;

        const matchesPrice=maxPrice==="" || product.price <= Number(maxPrice);
        return matchesCategory && matchesSearch && matchesPrice;
    });
    const sortedProducts = [...filteredProducts].sort((a,b)=>{
        if(sortOrder==="low-to-high"){
            return a.price-b.price
        }

        if(sortOrder==="high-to-low"){
            return b.price-a.price
        }
        return 0;
    })
    if(loading){
        return <Loading message="Loading Products..." />
    }
    if(error){
        return <ErrorMessage />
    }
    return(
        <main className="mx-auto max-w-6xl p-6">
            <h1 className="text-3xl mb-6 font-bold p-6 items-center text-center mt-6">Products</h1>
            <div className="flex flex-col mb-6 gap-4 sm:flex-col lg:flex-row">
                <input type="search" value={search} onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..." className="w-full rounded-md border p-3 sm:flex-1" aria-label="Search products" />
                <input type="number" min="0" value={maxPrice} onChange={(event)=>setMaxPrice(event.target.value)} placeholder="Maximum price" aria-label="Maximun price" className="rounded-md border p-3" />
                <select className="sm:w-auto border p-2 rounded-sm cursor-pointer" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
                    <option value="all">All categories</option>
                    {categories.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))} 
                </select>
                <select value={sortOrder} onChange={(event)=>setSortOrder(event.target.value)} aria-label="Sort products by price" className=" sm:w-auto rounded-md border p-3">
                    <option value="default">Default order</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
            </div>
            {sortedProducts.length===0 ? (<p className="py-6 items-center text-gray-600">No proucts match your search.</p>):
            (<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {sortedProducts.map((product) =>(
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>)
            }
        </main>
    )
}
export default Products;