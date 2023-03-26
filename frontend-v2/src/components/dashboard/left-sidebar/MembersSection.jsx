import PeopleIcon from '../../../static/img/PeopleIcon.png'
import AddPersonIcon from '../../../static/img/AddPersonIcon.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function MembersSection() {
    const currentProjectMembers = useSelector(state => state.currentProject.users);

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
            </div>
        </div>
    )
}