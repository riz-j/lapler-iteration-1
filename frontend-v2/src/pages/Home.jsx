import { useSelector } from "react-redux"
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const currentUser = useSelector(state => state.currentUser);
    
    useEffect(() => {
        console.log(currentUser.projects);
    }, [])

    const handleLogout = () => { localStorage.removeItem("reduxState"); location.reload(); }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl mb-8">Welcome back, {currentUser.firstName}</h1>
            
            <div className="grid grid-cols-2 gap-8 text-3xl">
              { currentUser.projects ? 
                Object.entries(currentUser.projects).map( ([projectId, projectName]) => {
                    return (
                        <Link to={`/dashboard/project/${projectId}`}>
                            <p className="bg-blue-200 px-4 py-2 rounded-lg">
                                {projectName}
                            </p>
                        </Link>
                    )} )  
                    : <></>
                }
            </div>
            
            <Link to="/project/new">
                <button onClick={ "" } className="text-lg bg-green-200 rounded-lg">
                    + Create Project
                </button>
            </Link>

            <button onClick={ handleLogout } className="text-lg bg-red-200 px-2 rounded-lg">
                Log Out
            </button>

        </div>
    )
}