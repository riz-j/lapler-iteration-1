import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { refetchCurrentUser } from "../redux/currentUserSlice";
import { deleteProject } from "../redux/projectSlice";

export default function Home() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    
    useEffect(() => {
        console.log(currentUser.projects);
    }, [])

    const handleLogout = () => { localStorage.removeItem("reduxState"); location.reload(); }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl mb-8">Welcome back, {currentUser.firstName}</h1>
      
          <div className="grid grid-cols-2 gap-8 text-3xl">
            {currentUser.projects ? (
              Object.entries(currentUser.projects).map(([projectId, projectName]) => (
                <div>
                  <Link to={`/dashboard/project/${projectId}`}>
                    <p className="bg-blue-200 px-4 py-2 rounded-lg">{projectName}</p>
                  </Link>
                  <button className="text-sm" onClick={async () => {
                    await dispatch(deleteProject({
                    projectIdToDelete: projectId,
                    token: currentUser.token}))
                    .then(() => dispatch(refetchCurrentUser()))}}>Delete</button>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          <div className="flex justify-evenly mt-8 w-1/3">
            <div>
                <Link to="/project/new">
                    <button className="text-lg bg-green-200 px-4 py-2 rounded-lg">+ Create Project</button>
                </Link>
            </div>
          
            <div>
                <button className="text-lg bg-red-200 px-4 py-2 rounded-lg"onClick={handleLogout} >
                    Log Out
                </button>
            </div>
          </div>
        </div>
      );
}