import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProjectProfilePic1 from '../../../static/img/ProjectProfilePic1.png'
import ProjectProfilePic2 from '../../../static/img/ProjectProfilePic2.png'
import ProjectProfilePic3 from '../../../static/img/ProjectProfilePic3.png'
import ProjectProfilePic4 from '../../../static/img/ProjectProfilePic4.png'
import CreateNewProject from './CreateNewProject'
import { useState } from 'react'

import ProjectCard from './ProjectCard'

export default function ProjectNavigation() {
    const currentUser = useSelector(state => state.currentUser);
    const currentProject = useSelector(state => state.currentProject);
    const projects = currentUser.projects;
    
    const [showTooltip, setShowTooltip] = useState(null);
    const [showCreateNewProjectTooltip, setShowCreateNewProjectTooltip] = useState(false);

    return (
        <div className="flex-none items-center h-screen w-12 bg-platinum-secondary border-r border-platinum-quarternary">
            <div className="flex h-full items-center justify-center">
                <div className="w-full">

                    { projects && (
                    Object.entries(currentUser.projects).map(([projectId, project]) => 
                        <Link 
                            to={`/dashboard/project/${projectId}`} 
                            className={`flex justify-center items-center h-12 w-12 ${ currentProject.id === project.id && 'border-l-4 border-green-500' }`}
                        >
                            <img 
                                key={projectId} 
                                src={project.displayPicture || ProjectProfilePic1} 
                                className='h-2/3 rounded-full'
                                onMouseEnter={() => setShowTooltip(projectId)}
                                onMouseLeave={() => setShowTooltip(null)}
                            />
                            { projectId === showTooltip && 
                                <div className='left-14 absolute bg-platinum-tertiary px-3 py-2 rounded-md'>
                                    <h1 className='text-md font-semibold'>{project.name}</h1> 
                                </div>
                            }  
                        </Link>
                    ))
                    }
                    
                    { currentUser.projects.length !== 0 &&
                        <hr className='border-2 mx-2.5 rounded my-2 border-[#3e3f43]' />
                    }
                    
                    <div
                        onMouseEnter={() => setShowCreateNewProjectTooltip(true)}
                        onMouseLeave={() => setShowCreateNewProjectTooltip(false)}
                        className='flex items-center'
                    >
                        <CreateNewProject />

                        { showCreateNewProjectTooltip &&
                            <div className='left-14 absolute bg-platinum-tertiary px-3 py-2 rounded-md'>
                                <h1 className='text-md font-semibold'>Create New Project</h1> 
                            </div>
                        }
                    </div>


                </div>
            </div>
        </div>
    )
}