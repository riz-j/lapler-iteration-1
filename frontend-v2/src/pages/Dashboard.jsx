import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { emptyCurrentProject, getCurrentProject } from "../redux/currentProjectSlice";
import IssueCard from "../components/IssueCard";
import ProjectUserCard from "../components/ProjectUserCard";

export default function Dashboard() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const currentProject = useSelector(state => state.currentProject);
    
    const currentProjectId = () => {              //
      const url = window.location.pathname;       //  Need to fix this by fixing the 
      const id = url.split("/").slice(-1)[0];     //  getCurrentProject()  to have the 
      return id;                                  //  Project ID in the redux state.
    };                                            //

    useEffect(() => {
        dispatch(emptyCurrentProject());
        dispatch(getCurrentProject({ 
            projectId: projectId, 
            token: currentUser.token 
        }));
    }, [])

    return (
        <div className="flex h-screen sm:text-sm">
          <div className="bg-green-300 w-80 hidden md:flex flex-col pt-4">
            <p className="bg-blue-200 rounded-lg px-5 py-2 border-b-2">All states</p>
            <p className="bg-blue-200 rounded-lg px-5 py-2 border-b-2">Some states</p>
            <p className="bg-blue-200 rounded-lg px-5 py-2 border-b-2">Few states</p>
            <Link to="/">
              <p className="bg-blue-200 rounded-lg px-5 py-2 border-b-2 mt-96">Home</p>
            </Link>
          </div>
      
          <div className="w-full bg-yellow-200">
            <div className="bg-green-200 flex justify-evenly items-center h-8">
              <input className="w-1/2 h-6" />
              <Link to="issues/new">
                <p>New Issue</p>
              </Link>
              <Link to="users/add">
                <p>Add User</p>
              </Link>
            </div>
      
            <div>
              {(currentProject.issues && currentProject.issues.length > 0) ? (
                currentProject.issues.map(issue => (
                  <IssueCard 
                    projectId={projectId}
                    issueId={issue.id} 
                    typeOfIssue={issue.typeOfIssue} 
                    priorityOfIssue={issue.priorityOfIssue} 
                    statusOfIssue={issue.statusOfIssue} 
                    summary={issue.summary}
                    dueDate={issue.dueDate}
                    assigneeId={issue.assigneeId}
                    reporterId={issue.reporterId}
                  /> 
                ))
              ) : (
                <h1>This project is empty</h1>
              )}
            </div>
          </div>
      
          <div className="bg-red-200 w-80 hidden md:block">
            { (currentProject.users) ? 
              (currentProject.users).map(user => 
                // <p className="bg-blue-200 rounded-lg px-5 py-2 border-b-2">{user.firstName} {user.lastName}</p>
                <ProjectUserCard userId={user.id} userFirstName={user.firstName} userLastName={user.lastName} />
              ) : <></>
            }
          </div>
        </div>
      );
}