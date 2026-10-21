import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartProvider from "./context/CartProvider";
import NotificationProvider from "./context/NotificationProvider";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(()=> import ("./pages/Products"));
const ProductDetails = lazy(()=> import ("./pages/ProductDetails"));
const Cart = lazy(()=> import ("./pages/Cart"));
const Login = lazy(()=> import ("./pages/Login"));
function App(){
  return(
    <ErrorBoundary>
    <AuthProvider>
    <NotificationProvider>
    <CartProvider>
    <BrowserRouter>
    <Navbar />
    <Suspense fallback={<Loading message="Loading Page..." />}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </CartProvider>
    </NotificationProvider>
    </AuthProvider>
    </ErrorBoundary>
  )
}
export default App;