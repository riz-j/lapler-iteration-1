import PeopleIcon from '../../../static/img/PeopleIcon.png'
import AddPersonIcon from '../../../static/img/AddPersonIcon.png'
import LeaveIcon from '../../../static/img/leave-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserFromProject } from '../../../redux/currentProjectSlice'
import { refetchCurrentUser } from '../../../redux/currentUserSlice'
import { useState } from 'react'
import ConfirmLeaveProjectSheet from '../../sheets/ConfirmLeaveProjectSheet'

export default function MembersSection() {
    const currentUser = useSelector(state => state.currentUser);
    const currentProject = useSelector(state => state.currentProject);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentProjectMembers = useSelector(state => state.currentProject.users);

    const [showCofirmLeaveProjectSheet, setShowConfirmLeaveProjectSheet] = useState(false);



    return (
        <div>
            <div className='flex flex-col justify-center items-start my-2.5'>
                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={PeopleIcon} className='w-3' />
                    </div>
                    <div>
                        <p className=''>Members</p>
                    </div>
                </div>

                <div className='flex flex-col items-start justify-center text-font-color-secondary gap-1 mx-8 my-0.5'>
                    { currentProjectMembers &&
                        currentProjectMembers.map(member => 
                            <p>{member.firstName} {member.lastName}</p>
                        )
                    }
                </div>

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={AddPersonIcon} className='w-3' />
                    </div>
                    <Link to='users/add'>
                        <p className=''>Add Members</p>
                    </Link>
                </div>

                <div 
                    onClick={() => setShowConfirmLeaveProjectSheet(true)}
                    className='flex items-center justify-center gap-2 mx-4 my-1 cursor-pointer'
                >
                    <div>
                        <img src={LeaveIcon} className='w-3' />
                    </div>
                    <div>
                        <p className='text-red-400'>Leave Project</p>
                    </div>
                </div>
            </div>
            { showCofirmLeaveProjectSheet && 
                <ConfirmLeaveProjectSheet 
                    onClick={() => setShowConfirmLeaveProjectSheet(!showCofirmLeaveProjectSheet)}
                    onClose={() => setShowConfirmLeaveProjectSheet(false)}
                />
            }
        </div>
    )
}