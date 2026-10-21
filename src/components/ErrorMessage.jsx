function ErrorMessage({error="Failed to fetch data"}){
    return(
        <div role="alert" className="flex flex-col justify-center items-center p-6 my-8">
            <h4 className="text-red-600 font-bold text-lg mt-2">Error</h4>
            <p className="text-sm font-medium text-gray-700">{error}</p>
        </div>
    )
}
export default ErrorMessage;