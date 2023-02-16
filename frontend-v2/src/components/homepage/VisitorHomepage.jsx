import { Link } from "react-router-dom";

export default function VisitorHomepage() {
    return (
        <div className="flex flex-col items-center justify-center bg-red-200 w-screen h-screen">
            <h1 className="text-3xl m-4">Welcome visitor!</h1>
            <div className="flex">
                <Link to="/login">
                    <p className="text-xl m-4 bg-blue-200 px-4 py-2 rounded-lg">Login</p>
                </Link>
                <Link to="/register">
                    <p className="text-xl m-4 bg-blue-200 px-4 py-2 rounded-lg">Register</p>
                </Link>
            </div>
        </div>
    )
}