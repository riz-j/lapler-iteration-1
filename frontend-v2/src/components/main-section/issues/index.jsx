import { useEffect } from 'react';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { emptyCurrentProject, getCurrentProject } from '../../../redux/currentProjectSlice';
import TopBar from '../top-bar';

import IssueCard from './IssueCard';
import IssuesSection from './IssuesSection';
// import ProjectUserCard from '../ProjectUserCard';

export default function MainSection() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.currentProject);
    const currentUser = useSelector(state => state.currentUser);
    const token = currentUser.token;
    
    useEffect(() => {
        dispatch(emptyCurrentProject());   // IMPORTANT: Project ID needed in CurrentProjectSlice
        dispatch(getCurrentProject({ 
            projectId: projectId, 
            token: token 
        }));
    }, [dispatch, projectId, token])

    return (
        <div className='grow w-full bg-[#1C1D21] text-base'>
            {/* <div className='bg-green-200 flex justify-evenly items-center h-8'>
              
              <input className='w-1/2 h-6' />
              
              <Link to='issues/new'>
                <p>New Issue</p>
              </Link>

              <Link to='users/add'>
                <p>Add User</p>
              </Link>

            </div> */}
            
            <TopBar />
      
            <IssuesSection />
            {/* <div>
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
            </div> */}
          </div>
    )
}