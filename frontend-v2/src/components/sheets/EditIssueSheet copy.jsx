import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProject } from "../../redux/currentProjectSlice";
import { updateProject } from "../../redux/currentProjectSlice";
import { convertToBase64 } from "../../utils/convertToBase64";
import pencil_icon from "../../static/img/pencil-icon.png"

export default function EditIssueSheet({ onClick, onClose, projectId, issueId }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.currentUser.token);
    const currentProject = useSelector(state => state.currentProject);

    const currentIssue = currentProject.issues.find(issue => issue.id === issueId);

    const projectMembers = currentProject.users;
    const projectAdminId = currentProject.adminId;
    const projectDisplayPicture = currentProject.displayPicture;

    const [projectName, setProjectName] = useState(currentProject.projectName);
    const [projectAdmin, setProjectAdmin] = useState(projectMembers.find(n => n.id === projectAdminId));
    const [projectDisplayPicFile, setProjectDisplayPicFile] = useState(null);
    const [projectDisplayPic, setProjectDisplayPic] = useState(projectDisplayPicture);
    const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);

    //-------------------------------------------

    const [typeOfIssue, setTypeOfIssue] = useState(currentIssue.typeOfIssue || null);
    const [priorityOfIssue, setPriorityOfIssue] = useState(currentIssue.priorityOfIssue || null);
    const [statusOfIssue, setStatusOfIssue] = useState(currentIssue.statusOfIssue || null);
    const [summary, setSummary] = useState(currentIssue.summary || null);
    const [toggleDueDate, setToggleDueDate] = useState(!(currentIssue.dueDate === null || currentIssue.dueDate === "" || currentIssue.dueDate === undefined));
    const [assigneeId, setAssigneeId] = useState(currentIssue.assigneeId || null);
    const [reporterId, setReporterId] = useState(currentIssue.reporterId || null);

    const [dueDateDay, setDueDateDay] = useState(1);
    const [dueDateMonth, setDueDateMonth] = useState(2);
    const [dueDateYear, setDueDateYear] = useState(2023);
    const dueDate = new Date(dueDateYear, dueDateMonth - 1, dueDateDay, 0, 0, 0).toISOString();
    useEffect(() => { console.log(dueDate) }, [dueDate]);

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
    return (
      <div className='absolute inset-0 z-20'>
      <div 
        onClick={onClick} 
        className='flex justify-center items-center bg-black w-full h-full bg-opacity-50'
      >
        <div 
            onClick={e => e.stopPropagation()}
            className='flex flex-col justify-between bg-platinum-secondary rounded-xl p-5 w-[70%] h-[70%] z-30 text-font-color-primary'
        >
            {/* <h1>ProjectID : {currentProject.id}</h1>
            <h1>{projectName}</h1>
            <h1>{projectAdmin.firstName}</h1> */}

            <div className="flex justify-between px-7 py-2 bg-platinum-tertiary h-32 gap-4 items-end rounded-xl">
              <div className="flex gap-4 items-end">
              <div className="relative w-52 h-20 hover:opacity-50">
                <img src={projectDisplayPic} className="w-full h-full rounded-xl" />
                
                <h1 className="flex">Project: {projectId}</h1>
                <h1 className="flex">Issue: {issueId}</h1>
                <h1 className="flex">Type of Issue: {typeOfIssue}</h1>
                <h1 className="flex">Priority of Issue: {priorityOfIssue}</h1>
                <h1 className="flex">Summary: {summary}</h1>
                <h1 className="flex">Due Date: {dueDate}</h1>
                <h1 className="flex">Assignee ID: {assigneeId}</h1>
                <h1 className="flex">Reporter ID: {reporterId}</h1>

                <input 
                  type='file' 
                  accept='image/*'
                  //onChange={handleFileUpload}
                  className="absolute opacity-0 w-full h-full cursor-pointer" 
                  style={{ top: 0, left: 0 }} 
                />
              </div>
                
                <h1 className="flex text-xl font-bold">
                  <input 
                    value={projectName} 
                    type='text' 
                    onChange={e => setProjectName(e.target.value)} 
                    //ref={projectNameInputRef}
                    className='bg-transparent text-font-color-primary'
                  />
                  
                </h1>
              </div>
              <img 
                src={pencil_icon} 
                //onClick={handleProjectNameEditButton} 
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