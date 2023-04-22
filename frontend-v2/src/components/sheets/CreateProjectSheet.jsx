import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProject, createIssue } from "../../redux/currentProjectSlice";
import { updateProject } from "../../redux/currentProjectSlice";
import { convertToBase64 } from "../../utils/convertToBase64";
import pencil_icon from "../../static/img/pencil-icon.png"
import { createProject } from "../../redux/projectSlice";
import { refetchCurrentUser } from "../../redux/currentUserSlice";

export default function CreateProjectSheet({ onClick, onClose }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser)
    const token = useSelector(state => state.currentUser.token);
    
    const [projectName, setProjectName] = useState("");

    const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);

    const handleSubmit = async (e) => {
          e.preventDefault();
          setLoadingSaveChanges(true);
          await dispatch(createProject({ 
              projectName: projectName,
              token: currentUser.token
          }))
          .then(() => dispatch(refetchCurrentUser({userId: currentUser.id})))
          .then(() => {
            setLoadingSaveChanges(false);
            onClose();
          })
          .catch(err => console.log(err));
    }

    useEffect(() => console.log(projectName), [projectName]);

    return (
      <div className='absolute inset-0 z-20'>
      <div 
        onClick={onClick} 
        className='flex justify-center items-center bg-black w-full h-full bg-opacity-50'
      >
        <div 
          onClick={e => e.stopPropagation()}
          className='flex flex-col justify-between bg-platinum-secondary rounded-xl p-10 z-30 text-font-color-primary'
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-semibold">
              
              <div className="flex flex-col gap-1 text-md">
                <label>Project Name</label>
                <input 
                    type='text' 
                    value={projectName} 
                    placeholder='Project Name' 
                    className='border-2 text-black bg-gray-300 border-black px-3 py-3 my-1 h-10 rounded-md w-full'
                    onChange={e => setProjectName(e.target.value)} 
                />
              </div>

            </form>
              
            

          <form onSubmit={handleSubmit} className='flex items-end flex-col gap-5 my-5 leading-tight text-gray-500'>
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
                    value='Create New Project'
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

