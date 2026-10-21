import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const controller = new AbortController();

    getProducts(controller.signal)
        .then((data) => {
            setProducts(data.slice(0, 4));
        })
        .catch((err) => {
            if (err.name !== "AbortError") {
                setError(err.message);
            }
        })
        .finally(() => {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        });

    return () => controller.abort();
}, []);

    return (
        <div className="space-y-12 pb-16">
            {/* 1. Hero Section */}
            <section className="bg-indigo-900 text-white py-20 px-6 text-center rounded-2xl shadow-lg my-6 mx-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Welcome to StoreEase
                </h1>
                <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-8">
                    Discover the best products at unbeatable prices. Fast shipping, secure checkout, and premium quality guaranteed.
                </p>
                <Link
                    to="/products"
                    className="bg-white text-indigo-900 font-bold px-8 py-3 rounded-lg shadow hover:bg-indigo-100 transition"
                >
                    Shop Now
                </Link>
            </section>

            {/* 2. Categories / Features Section */}
            <section className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Popular Categories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                        <h3 className="font-bold text-lg mb-2">Electronics</h3>
                        <p className="text-gray-600 text-sm">Latest gadgets and tech accessories.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                        <h3 className="font-bold text-lg mb-2">Apparel & Fashion</h3>
                        <p className="text-gray-600 text-sm">Trendy clothing for men and women.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                        <h3 className="font-bold text-lg mb-2">Jewelry & Accessories</h3>
                        <p className="text-gray-600 text-sm">Elegant pieces for your special moments.</p>
                    </div>
                </div>
            </section>

            {/* 3. Featured Products Section */}
            <section className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Featured Products
                </h2>

                {loading && <Loading message="Loading featured items..." />}
                {error && <ErrorMessage error={error} />}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}