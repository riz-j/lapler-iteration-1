import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { refetchCurrentUser } from '../../../redux/currentUserSlice';
import { deleteProject } from '../../../redux/projectSlice';
import ProjectProfilePic4 from '../../../static/img/ProjectProfilePic4.png'

export default function ProjectCard({projectId, projectName}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);

    const handleClick = async () => {
        await dispatch(deleteProject({
            projectIdToDelete: projectId,
            token: currentUser.token
        }))
        .then(() => dispatch(refetchCurrentUser({userId: currentUser.id})))
    }

    return (
        <div className="flex justify-center items-center h-12 w-full">
            <Link to={`/dashboard/project/${projectId}`}>
                <img src={ProjectProfilePic4} className='w-2/3 h-2/3 rounded-full'/>
            </Link>
        </div>
       
    )
}

{/* <div className='flex'>

<Link to={`/dashboard/project/${projectId}`}>
    <p className='bg-blue-100 text-3xl px-4 py-2 rounded-lg'>{projectName}</p>
</Link>

<button onClick={handleClick} className='text-3xl text-red-500'>
    x
</button>

</div> */}