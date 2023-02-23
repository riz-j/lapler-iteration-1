import { useSelector } from 'react-redux'
import ProfilePic from '../../../static/img/ProfilePic.png'

export default function ProfileSection() {
    const currentUser = useSelector(state => state.currentUser);
    const firstName = currentUser.firstName;
    const lastName = currentUser.lastName;
    const email = currentUser.email;

    return (
        <div>
            <div className='fixed bottom-0 w-56 h-12 flex items-center border-t border-[#303135]'>
                <div className='flex justify-start items-center mx-3 gap-2'>
                    <div>
                        <img src={ProfilePic} className='h-7 w-7' />
                    </div>
                    <div>
                        <div className='text-base font-semibold'>{firstName} {lastName}</div>
                        <div className='text-xs '>{email}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}