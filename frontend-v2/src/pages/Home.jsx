import { useSelector } from "react-redux"

export default function Home() {
    const currentUser = useSelector(state => state.currentUser);
    return (
        <div className="flex justify-center items-center h-screen text-4xl">
            <h1>Welcome back, {currentUser.firstName}</h1>
        </div>
    )
}