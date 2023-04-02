import { useSelector } from 'react-redux';
import defaultDisplayPic from '../../../static/img/ProjectProfilePic1.png'
import ProjectSettingsIcon from '../../../static/img/ProjectSettingsIcon.png'
import { useState } from 'react';
import ProjectSettingsSheet from '../../sheets/ProjectSettingsSheet';

export default function ProjectNameHeader() {
    const currentProject = useSelector(state => state.currentProject);
    const [sheetPresented, setSheetPresented] = useState(false);

    return (
        <div>
            <div className='flex justify-between  items-center h-12 w-full top-0 left-0'>
                <div className='flex justify-start items-center gap-2 ml-4'> 
                    <img src={currentProject.displayPicture || defaultDisplayPic} className='w-6 h-6 rounded' />
                    <h1 className='truncate overflow-hidden text-md font-semibold text-font-color-primary w-32'>
                        {currentProject.projectName}
                    </h1>
                </div>
                <div>
                    <img 
                        onClick={() => setSheetPresented(!sheetPresented)}
                        src={ProjectSettingsIcon} className='w-6 h-6 mr-4 cursor-pointer' 
                    />
                </div>
            </div>
            <hr className='border-platinum-quarternary' />
            { sheetPresented && 
                <ProjectSettingsSheet 
                    onClick={() => setSheetPresented(!sheetPresented)} 
                    onClose={() => setSheetPresented(false)}
                /> }
        </div>
    )
}