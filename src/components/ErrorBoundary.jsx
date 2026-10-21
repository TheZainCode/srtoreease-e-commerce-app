import React from "react";
class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state ={ hasError : false}
    }
    static getDerivedStateFromError(error){
        return(
            { hasError : true}
        )
    }
    componentDidCatch(error, errorInfo){
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    render(){
        if(this.state.hasError){
            return(
                <div className="flex flex-col justify-center items-center min-h-[50vh] p-6 text-center">
                    <h2 className="font-bold text-2xl text-red-600 mb-2">Something went wrong.</h2>
                    <p className="mb-4 text-gray-600">An unexpected rendering error occurred</p>
                    <button className="px-3 py-2 rounded-md bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700" onClick={()=>window.location.reload()}>Reload Page</button>
                </div>
            )
        }
        return this.props.children;
    }
}
export default ErrorBoundary;