function Loading({message=" Loading..."}){
    return(
    <div role="status" className="flex flex-col justify-center items-center py-16 gap-3">
        <div className="w-10 h-10 rounded-full border-indigo-200 border-t-indigo-600 animate-spin border-4"></div>
        <p className="mt-4 text-md font-semibold text-gray-600 animate-pulse">{message}</p>
    </div>
    )
}
export default Loading;