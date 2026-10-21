import { useAuth } from "../context/useAuth";
function Login(){
    const { user, login, logout, isAuthenticated}=useAuth();
    return(
        <main className="mx-auto max-w-4xl p-6">
            {isAuthenticated ? (
                <article className="flex flex-col items-center text-center gap-4 p-6 mx-auto">
                    <h2 className="font-bold text-3xl text-blue-600">Welcome, {user.name}!</h2>
                    <h3 className="font-semibold text-xl">Role: {user.role}</h3>
                    <button onClick={logout} className="rounded-md px-3 py-2 text-center bg-blue-600 text-white cursor-pointer hover:bg-blue-700">Logout</button>
                </article>
            ): <article className="flex flex-col items-center text-center gap-4 p-6 mx-auto ">
                <h2 className="font-bold text-3xl text-blue-600">Welcome back</h2>
                <p>Please log in to continue</p>
                <button onClick={() => login()} className="rounded-md px-3 py-2 text-center bg-blue-600 text-white cursor-pointer hover:bg-blue-700">Login</button>
            </article>
            }
        </main>
    )
}
export default Login;