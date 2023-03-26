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
        console.log(currentProject.issues.length)
    }, [dispatch, projectId, token])

    function renderLoading() {
      return (
        <div className="flex justify-center items-center h-[90%]">
          <h1 className="text-mm-lg italic text-font-color-secondary">Loading...</h1>
        </div>
      );
    }

    function renderEmptyProject() {
      return (
        <div className="flex justify-center items-center h-[90%]">
          <h1 className="text-mm-lg italic text-font-color-secondary">This project is empty</h1>
        </div>
      );
    }
    

    return (
        <div className='grow w-full bg-platinum-main text-base overflow-y-auto'>
            
            <TopBar />

            {  currentProject && currentProject.issues && currentProject.issues.length !== 0 ?

                <IssuesSection />

              :

                  currentProject.isLoading === true ?
                    
                    renderLoading()

                    :

                    renderEmptyProject()

            }
                        
        </div>
    )
}