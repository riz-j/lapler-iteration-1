import PeopleIcon from '../../../static/img/PeopleIcon.png'
import AddPersonIcon from '../../../static/img/AddPersonIcon.png'


export default function MembersSection() {
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

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={AddPersonIcon} className='w-3' />
                    </div>
                    <div>
                        <p className=''>Add Members</p>
                    </div>
                </div>
            </div>
        </div>
    )
}