import { useSelector } from 'react-redux';
import ProjectProfilePicture from '../../../static/img/IMG_2352.png';
import ProjectSettingsIcon from '../../../static/img/ProjectSettingsIcon.png'

export default function ProjectNameHeader() {
    const currentProject = useSelector(state => state.currentProject);

    return (
        <div>
            <div className='flex justify-between  items-center h-12 w-full top-0 left-0'>
                <div className='flex justify-start items-center gap-2 ml-4'> 
                    <img src={ProjectProfilePicture} className='w-6 h-6 rounded' />
                    <h1 className='truncate overflow-hidden text-md font-semibold text-[#FCFDFF] w-32'>
                        {currentProject.projectName}
                    </h1>
                </div>
                <div>
                    <img src={ProjectSettingsIcon} className='w-6 h-6 mr-4' />
                </div>
            </div>
            <hr className='border-[#303135]' />
        </div>
    )
}