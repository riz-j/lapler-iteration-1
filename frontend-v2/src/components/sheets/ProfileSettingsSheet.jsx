import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProject } from "../../redux/currentProjectSlice";
import { updateProject } from "../../redux/currentProjectSlice";
import { convertToBase64 } from "../../utils/convertToBase64";
import pencil_icon from "../../static/img/pencil-icon.png"
import { refetchCurrentUser } from "../../redux/currentUserSlice";
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

    const [projectName, setProjectName] = useState(currentProject.projectName);
    const [projectAdmin, setProjectAdmin] = useState(projectMembers.find(n => n.id === projectAdminId));
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(_profilePicture);
    const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSaveChanges(true);

        await dispatch(updateProject({
          projectId: currentProject.id,
          name: projectName,
          displayPicture: profilePicture,
          adminId: projectAdmin.id,
          token: token
        }))
        .then(() => dispatch(getCurrentProject({
          projectId: currentProject.id,
          token: token
        })))
        .then(() => dispatch(refetchCurrentUser({
          userId: 18,
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
            {/* <h1>ProjectID : {currentProject.id}</h1>
            <h1>{projectName}</h1>
            <h1>{projectAdmin.firstName}</h1> */}

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
                
                <h1 className="flex text-xl font-bold">
                  <input 
                    value={`${_firstName} ${_lastName}`} 
                    type='text' 
                    onChange={e => setProjectName(e.target.value)} 
                    ref={projectNameInputRef}
                    className='bg-transparent text-font-color-primary'
                  />
                  
                </h1>
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


     {/* FOR CHANGING PROJECT ADMIN */}

     {/* <select onChange={ e => setProjectAdmin(e.target.value) }>
       { Object.entries(projectMembers).map(([memberId, member]) => 
         <option key={memberId} value={member.id}>{member.firstName} {member.lastName}</option>
       )}
     </select> */}