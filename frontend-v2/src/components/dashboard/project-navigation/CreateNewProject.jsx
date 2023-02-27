import CreateNewProjectIcon from '../../../static/img/CreateNewProjectIcon.png'
import { Link } from 'react-router-dom'

export default function CreateNewProject() {
    return (
        <Link to='/project/new' className="flex justify-center items-center h-12 w-full">
            <img src={CreateNewProjectIcon} className='w-2/3 h-2/3 rounded-full'/>
        </Link>  
    )
}
