import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProjectProfilePic1 from '../../../static/img/ProjectProfilePic1.png'
import ProjectProfilePic2 from '../../../static/img/ProjectProfilePic2.png'
import ProjectProfilePic3 from '../../../static/img/ProjectProfilePic3.png'
import ProjectProfilePic4 from '../../../static/img/ProjectProfilePic4.png'
import CreateNewProject from './CreateNewProject'

import ProjectCard from './ProjectCard'

export default function ProjectNavigation() {
    const currentUser = useSelector(state => state.currentUser);

    return (
        <div className="flex-none items-center h-screen w-12 bg-platinum-secondary border-r border-[#303135]">
            <div className="flex h-full items-center justify-center">
                <div className="w-full">

                    { currentUser.projects && (
                    Object.entries(currentUser.projects).map(([projectId, projectName]) => 
                        <Link to={`/dashboard/project/${projectId}`} className="flex justify-center items-center h-12 w-12">
                            <img key={projectId} src={ProjectProfilePic4} className='w-2/3 h-2/3 rounded-full'/>
                        </Link>
                    ))
                    }

                    <div className="flex justify-center items-center h-12 w-full">
                        <img src={ProjectProfilePic4} className='w-2/3 h-2/3 rounded-full'/>
                    </div>  

                    <div className="flex justify-center items-center h-12 w-full">
                        <img src={ProjectProfilePic3} className='w-2/3 h-2/3 rounded-full'/>
                    </div>  

                    <div className="flex justify-center items-center h-12 w-full">
                        <img src={ProjectProfilePic2} className='w-2/3 h-2/3 rounded-full'/>
                    </div>  
                    
                    { currentUser.projects &&
                        <hr className='border-2 mx-2.5 rounded my-2 border-[#3e3f43]' />
                    }
                    
                    <CreateNewProject />

                </div>
            </div>
        </div>
    )
}