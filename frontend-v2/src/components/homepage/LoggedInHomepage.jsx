import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

import ProjectCard from '../ProjectCard';

export default function LoggedInHomepage() {
    const currentUser = useSelector(state => state.currentUser);

    const handleLogout = () => { 
      localStorage.removeItem('reduxState');
      location.reload(); 
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
          
          <h1 className='text-4xl mb-8'>
            Welcome back, {currentUser.firstName}
          </h1>
      
          <div className='grid grid-cols-2 gap-8'> 

            { currentUser.projects && (
              Object.entries(currentUser.projects).map(([projectId, project]) => 
                <ProjectCard projectId={projectId} projectName={project.name} />
              ))
            }

          </div>

          <div className='flex justify-evenly mt-8 w-1/3'>

            <div>
                <Link to='/project/new'>
                    <button className='text-lg bg-green-200 px-4 py-2 rounded-lg'>
                      + Create Project
                    </button>
                </Link>
            </div>
          
            <div>
                <button onClick={handleLogout} className='text-lg bg-red-200 px-4 py-2 rounded-lg'>
                    Log Out
                </button>
            </div>

          </div>
        </div>
    )
}