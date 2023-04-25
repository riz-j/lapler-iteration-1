import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToBase64 } from "../../utils/convertToBase64";
import pencil_icon from "../../static/img/pencil-icon.png"
import { refetchCurrentUser, updateUser } from "../../redux/currentUserSlice";
import emptyProfilePic from "../../static/img/emptyProfilePic.png"

export default function ProfileSettingsSheet({ onClick, onClose }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.currentUser.token);
    const currentProject = useSelector(state => state.currentProject);
    const currentUser = useSelector(state => state.currentUser);
    const projectMembers = currentProject.users;
    const projectAdminId = currentProject.adminId;
    const _profilePicture = currentUser.profilePicture;
    const _firstName = currentUser.firstName;
    const _lastName = currentUser.lastName;

    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(_profilePicture);
    
    const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);
    const [firstName, setFirstName] = useState(_firstName);
    const [lastName, setLastName] = useState(_lastName);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSaveChanges(true);

        await dispatch(updateUser({
          userId: currentUser.id,
          firstName: firstName,
          lastName: lastName,
          profilePicture: profilePicture,
          email: currentUser.email
        }))
        .then(() => dispatch(refetchCurrentUser({
          userId: currentUser.id,
          token: token
        })))
        .then(() => { 
          setLoadingSaveChanges(false);
          onClose(); 
        })
    }

    const projectNameInputRef = useRef(null);
    const handleProjectNameEditButton = () => {
      if (projectNameInputRef.current) {
        projectNameInputRef.current.focus();
      }
    }

    const handleFileUpload = (e) => {
      setProfilePictureFile(e.target.files[0])
    }

    useEffect(() => {
      const processFile = async () => {
        try {
          const base64String = await convertToBase64(profilePictureFile);
          setProfilePicture(base64String);
        } catch(error) {
          console.log(`Error uploading and/or processing file: ${error}`)
        }
      }
      processFile();
    }, [profilePictureFile]);

    useEffect(() => {
      console.log(`Display Pic : ${profilePicture}`);
    }, [profilePicture]);

    return (
      <div className='absolute inset-0 z-20'>
      <div 
        onClick={onClick} 
        className='flex justify-center items-center bg-black w-full h-full bg-opacity-50'
      >
        <div 
            onClick={e => e.stopPropagation()}
            className='flex flex-col justify-between bg-platinum-secondary rounded-xl p-5 w-[70%] h-[40%] z-30 text-font-color-primary'
        >
            <div className="flex justify-between px-7 py-2 bg-platinum-tertiary h-32 gap-4 items-end rounded-xl">
              <div className="flex gap-4 items-end">
              <div className="relative w-20 h-20 hover:opacity-50">
                <img src={profilePicture || emptyProfilePic} className="w-full h-full rounded-xl" />
                <input 
                  type='file' 
                  accept='image/*'
                  onChange={handleFileUpload}
                  className="absolute opacity-0 w-full h-full cursor-pointer" 
                  style={{ top: 0, left: 0 }} 
                />
              </div>
                
                <div className="flex flex-col justify-start leading-3 text-xl font-bold">
                  <input 
                    value={`${firstName}`} 
                    type='text' 
                    onChange={e => setFirstName(e.target.value)} 
                    ref={projectNameInputRef}
                    className='bg-transparent text-font-color-primary'
                  />
                  <input 
                    value={`${lastName}`} 
                    type='text' 
                    onChange={e => setLastName(e.target.value)} 
                    className='bg-transparent text-font-color-primary'
                  />   
                </div>
              </div>
              <img 
                src={pencil_icon} 
                onClick={handleProjectNameEditButton} 
                className="h-4 w-4 mb-4 cursor-pointer" 
              />
            </div>

          <form onSubmit={handleSubmit} className='flex items-end flex-col gap-5 m-5 leading-tight text-gray-500'>
            {
              loadingSaveChanges ? 
                <img 
                  src={'https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif'} 
                  className='absolute inset-0'
                />
                : 
                <div className="flex gap-3">
                  <button
                    className="bg-gray-400 hover:bg-gray-300 px-5 py-3 rounded-lg text-md text-black font-bold"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <input 
                    type='submit' 
                    value='Save Changes'
                    onClick={() => console.log("Joe Mama")}
                    className="bg-green-500 hover:bg-green-400 px-5 py-3 rounded-lg text-md text-black font-bold cursor-pointer"
                  />
                </div>
            }
          </form>
        </div>
      </div>
    </div>
    )
  }

