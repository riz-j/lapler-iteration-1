import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProject } from "../../redux/currentProjectSlice";
import { updateProject } from "../../redux/currentProjectSlice";

export default function ProjectSettingsSheet({ onClick, onClose }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.currentUser.token);
    const currentProject = useSelector(state => state.currentProject);
    const projectMembers = currentProject.users;
    const projectAdminId = currentProject.adminId;
    const projectDisplayPicture = currentProject.displayPicture;

    const [projectName, setProjectName] = useState(currentProject.projectName);
    const [projectAdmin, setProjectAdmin] = useState(projectMembers.find(n => n.id === projectAdminId));
    const [projectDisplayPic, setProjectDisplayPic] = useState(projectDisplayPicture);
    const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSaveChanges(true);

        await dispatch(updateProject({
          projectId: currentProject.id,
          name: projectName,
          displayPicture: projectDisplayPic,
          adminId: projectAdmin.id,
          token: token
        }))
        .then(() => dispatch(getCurrentProject({
          projectId: currentProject.id,
          token: token
        })))
        .then(() => { 
          setLoadingSaveChanges(false);
          onClose(); 
        })
    }

    useEffect(() => {
      console.log(currentProject.id);
    }, []);

    return (
      <div className='absolute inset-0 z-20'>
      <div 
        onClick={onClick} 
        className='flex justify-center items-center bg-black w-full h-full bg-opacity-50'
      >
        <div 
            onClick={event => event.stopPropagation()}
            className='bg-platinum-secondary w-[80%] h-[80%] z-30 text-font-color-primary'
        >
          <h1>ProjectID : {currentProject.id}</h1>
            <h1>{projectName}</h1>
            <h1>{projectAdmin.firstName}</h1>
            <img src={projectDisplayPic} />

          <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-10 text-gray-500'>

            <label>Project Name</label>
            <input 
              value={projectName} 
              type='text' 
              onChange={e => setProjectName(e.target.value)} 
              className='bg-transparent'
            />

            {/* FOR CHANGING PROJECT ADMIN */}

            {/* <select onChange={ e => setProjectAdmin(e.target.value) }>
              { Object.entries(projectMembers).map(([memberId, member]) => 
                <option key={memberId} value={member.id}>{member.firstName} {member.lastName}</option>
              )}
            </select> */}

            <input type='text' onChange={e => setProjectDisplayPic(e.target.value)} />

            {
              loadingSaveChanges ? 
                <img 
                  src={'https://media.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif'} 
                  className='absolute inset-0'
                />
                : 
                <input type='submit' onClick={() => console.log("Joe Mama")}/>
            }
            
          </form>
        </div>
      </div>
    </div>
    )
  }