import { useSelector } from 'react-redux'
//import ProfilePic from '../../../static/img/ProfilePic.png'
import { useState } from 'react';
import ProfileSettingsSheet from '../../sheets/ProfileSettingsSheet';
import EditIssueSheet from '../../sheets/EditIssueSheet';
import emptyProfilePic from '../../../static/img/emptyProfilePic.png'
import { useNavigate } from 'react-router-dom';

export default function ProfileSection() {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser);
    const firstName = currentUser.firstName;
    const lastName = currentUser.lastName;
    const email = currentUser.email;
    const profilePic = currentUser.profilePicture;

    const [showMenuSheet, setShowMenuSheet] = useState(false);
    const [showEditProfileSheet, setShowEditProfileSheet] = useState(false);

    const handleLogout = () => { 
        localStorage.removeItem('reduxState');
        navigate("/")
        window.location.reload(); 
    }

    return (
        <div 
            onMouseEnter={() => setShowMenuSheet(true)} 
            onMouseLeave={() => setShowMenuSheet(false)}
            onClick={() => setShowMenuSheet(!showMenuSheet)}
        >
            <div className='fixed bottom-0 w-56 h-12 flex items-center border-t border-platinum-quarternary'>
                <div className='flex justify-start items-center mx-3 gap-2'>
                    <div>
                        <img src={profilePic || emptyProfilePic} className='h-7 w-7' />
                    </div>
                    <div>
                        <div className='text-base font-semibold'>{firstName} {lastName}</div>
                        <div className='text-xs '>{email}</div>
                    </div>
                </div>
            </div>
            { showMenuSheet &&
                <div className='absolute bottom-12 w-56 bg-platinum-secondary font-semibold'>
                    <div 
                        onClick={() => setShowEditProfileSheet(true)}
                        className='flex justify-start items-center px-3 py-2 bg-platinum-secondary hover:bg-platinum-tertiary cursor-pointer'
                    >
                        Edit Profile
                    </div>
                    <hr className='border-platinum-tertiary' />
                    <div className='flex justify-start items-center px-3 py-2 bg-platinum-secondary hover:bg-platinum-tertiary cursor-pointer'>
                        Invitations
                    </div>
                    <div 
                        onClick={handleLogout}
                        className='flex justify-start items-center px-3 py-2 bg-red-800 hover:bg-red-700 cursor-pointer'
                    >
                        Log Out
                    </div>
                </div>
            }
            { showEditProfileSheet &&
                <ProfileSettingsSheet
                    onClick={() => setShowEditProfileSheet(!showEditProfileSheet)}
                    onClose={() => setShowEditProfileSheet(false)}
                />
            }
        </div>
    )
}