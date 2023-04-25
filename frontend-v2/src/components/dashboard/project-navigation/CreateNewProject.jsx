import CreateNewProjectIcon from '../../../static/img/CreateNewProjectIcon.png'
import CreateProjectSheet from '../../sheets/CreateProjectSheet';
import { useState } from 'react';

export default function CreateNewProject() {
    const [showSheet, setShowSheet] = useState(false);

    const handleClick = () => {
        setShowSheet(true)
    }

    return (
        <>
            <div 
                onClick={handleClick} 
                className="flex justify-center items-center h-12 w-full cursor-pointer"
            >
                <img src={CreateNewProjectIcon} className='w-2/3 h-2/3 rounded-full'/>
            </div> 

            { showSheet && 
                <CreateProjectSheet 
                    onClose={ () => setShowSheet(false) }
                    onClick={ () => setShowSheet(!showSheet) }
                />
            }
        </> 
    )
}
