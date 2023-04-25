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
                <img src={ProjectProfilePic4} className='rounded-full'/>
            </Link>
        </div>
       
    )
}
