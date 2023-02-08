import { useSelector } from "react-redux"
import { useEffect } from "react";

export default function Home() {
    const currentUser = useSelector(state => state.currentUser);
    
    useEffect(() => {
        console.log(currentUser.projects);
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl mb-8">Welcome back, {currentUser.firstName}</h1>
            
            <div className="grid grid-cols-2 gap-8 text-3xl">
                { Object.entries(currentUser.projects).map( ([projectId, projectName]) => {
                    return (
                        <p className="bg-blue-200 px-4 py-2 rounded-lg">
                            {projectName}
                        </p>
                    )} )  
                }
            </div>
        </div>
    )
}