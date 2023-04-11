import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProject, createIssue } from "../../redux/currentProjectSlice";
import { updateProject } from "../../redux/currentProjectSlice";
import { convertToBase64 } from "../../utils/convertToBase64";
import pencil_icon from "../../static/img/pencil-icon.png"

export default function CreateIssueSheet({ onClick, onClose }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser)
    const token = useSelector(state => state.currentUser.token);
    const currentProject = useSelector(state => state.currentProject);
    const projectId = useSelector(state => state.currentProject.id)

    const projectMembers = currentProject.users;
    const projectAdminId = currentProject.adminId;
    const projectDisplayPicture = currentProject.displayPicture;

    const [projectName, setProjectName] = useState(currentProject.projectName);
    const [projectAdmin, setProjectAdmin] = useState(projectMembers.find(n => n.id === projectAdminId));
    const [projectDisplayPicFile, setProjectDisplayPicFile] = useState(null);
    const [projectDisplayPic, setProjectDisplayPic] = useState(projectDisplayPicture);
    const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);

    //-------------------------------------------

    // const [typeOfIssue, setTypeOfIssue] = useState(currentIssue.typeOfIssue || null);
    // const [priorityOfIssue, setPriorityOfIssue] = useState(currentIssue.priorityOfIssue || null);
    // const [statusOfIssue, setStatusOfIssue] = useState(currentIssue.statusOfIssue || null);
    // const [summary, setSummary] = useState(currentIssue.summary || null);
    // const [toggleDueDate, setToggleDueDate] = useState(!(currentIssue.dueDate === null || currentIssue.dueDate === "" || currentIssue.dueDate === undefined));
    // const [assigneeId, setAssigneeId] = useState(currentIssue.assigneeId || null);
    // const [reporterId, setReporterId] = useState(currentIssue.reporterId || null);

    // const [dueDateDay, setDueDateDay] = useState(1);
    // const [dueDateMonth, setDueDateMonth] = useState(2);
    // const [dueDateYear, setDueDateYear] = useState(2023);
    // const dueDate = new Date(dueDateYear, dueDateMonth - 1, dueDateDay, 0, 0, 0).toISOString();
    // useEffect(() => { console.log(dueDate) }, [dueDate]);

    // let _dueDate;
    // if (currentIssue.dueDate) {
    //   const dueDateString = currentIssue.dueDate;
    //   const year = parseInt(dueDateString.slice(0,4));
    //   const month = parseInt(dueDateString.slice(5, 7)) - 1;
    //   const day = parseInt(dueDateString.slice(8, 10));
    //   const parsedDueDate = new Date(Date.UTC(year, month, day));
    //   _dueDate = parsedDueDate;
    // } else {
    //   _dueDate = null;
    // }
    // const [dueDate, setDueDate] = useState(_dueDate);
    // useEffect(() => console.log(dueDate), [dueDate]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoadingSaveChanges(true);

    //     await dispatch(updateIssue({
    //         issueId: issueId, 
    //         typeOfIssue: typeOfIssue, 
    //         priorityOfIssue: priorityOfIssue, 
    //         statusOfIssue: statusOfIssue, 
    //         summary: summary, 
    //         projectId: projectId, 
    //         dueDate: dueDate,
    //         assigneeId: (assigneeId !== "") ? assigneeId : null,
    //         reporterId: reporterId, 
    //         token: token
    //     }))
    //     .then(() => dispatch(getCurrentProject({
    //         projectId: projectId,
    //         token: token
    //     })))
    //     .then(() => { 
    //       setLoadingSaveChanges(false);
    //       onClose(); 
    //     })
    //     .catch(err => console.log(err));
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSaveChanges(true);
          //navigate(-1);
          await dispatch(createIssue({
              token: currentUser.token,
              projectId: projectId,
              typeOfIssue: typeOfIssue,
              priorityOfIssue: priorityOfIssue,
              statusOfIssue: statusOfIssue,
              dueDate: dueDate,
              ...(assigneeId && { assigneeId }),
              summary: summary
          }))
          .then(() => dispatch(getCurrentProject({
              projectId: projectId,
              token: token
          })))
          .then(() => {
            setLoadingSaveChanges(false);
            onClose();
          })
          .catch(err => console.log(err));
    }

    const [typeOfIssue, setTypeOfIssue] = useState('Bug');
    const [priorityOfIssue, setPriorityOfIssue] = useState('Low');
    const [statusOfIssue, setStatusOfIssue] = useState('Backlog');
    const [summary, setSummary] = useState('');
    const [assigneeId, setAssigneeId] = useState(null);
    const [dueDate, setDueDate] = useState(null)
    useEffect(() => console.log(dueDate), [dueDate]);

    return (
      <div className='absolute inset-0 z-20'>
      <div 
        onClick={onClick} 
        className='flex justify-center items-center bg-black w-full h-full bg-opacity-50'
      >
        <div 
          onClick={e => e.stopPropagation()}
          className='flex flex-col justify-between bg-platinum-secondary rounded-xl p-10 h-[60%] z-30 text-font-color-primary'
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-semibold">
              <div className="flex gap-5">
                <div className="flex flex-col gap-1">
                  <label>Type</label>
                  <select 
                      value={typeOfIssue} 
                      className='border-2 text-black bg-gray-300 border-black px-3 py-2 h-10 rounded-md'
                      onChange={e => setTypeOfIssue(e.target.value)}
                  >
                      <option value='Bug'>Bug</option>
                      <option value='Improvement'>Improvement</option>
                      <option value='New Feature'>New Feature</option>
                      <option value='Epic'>Epic</option>
                      <option value='Idea'>Idea</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label>Priority</label>
                  <select 
                      value={priorityOfIssue} 
                      className='border-2 text-black bg-gray-300 border-black px-3 py-2 h-10 rounded-md w-full'
                      onChange={e => setPriorityOfIssue(e.target.value)} 
                  >
                      <option value='Low'>Low</option>
                      <option value='Medium'>Medium</option>
                      <option value='High'>High</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label>Status</label>
                  <select 
                      value={statusOfIssue} 
                      className='border-2 text-black bg-gray-300 border-black px-3 py-2 h-10 rounded-md w-full'
                      onChange={e => setStatusOfIssue(e.target.value)} 
                  >
                      <option value='Backlog'>Backlog</option>
                      <option value='Waiting'>Waiting</option>
                      <option value='Doing'>Doing</option>
                      <option value='Done'>Done</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label>Summary</label>
                <input 
                    type='text' 
                    value={summary} 
                    placeholder='summary' 
                    className='border-2 text-black bg-gray-300 border-black px-3 py-2 h-10 rounded-md w-full'
                    onChange={e => setSummary(e.target.value)} 
                />
              </div>
              <div className="flex gap-5">
                
                <div className="flex flex-col gap-1">
                  <label>Due Date</label>
                  <input 
                    value={dueDate ? dueDate.toISOString().substr(0, 10) : null}
                    onChange={e => {
                      const year = parseInt(e.target.value.slice(0,4));
                      const month = parseInt(e.target.value.slice(5, 7)) - 1; 
                      const day = parseInt(e.target.value.slice(8, 10));
                      const utcDueDate = new Date(Date.UTC(year, month, day));
                      setDueDate(utcDueDate);
                    }}
                    type="date"
                    className='border-2 text-black bg-gray-300 border-black px-3 h-10 rounded-md w-full'
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Assignee</label>
                  <select 
                      value={assigneeId} 
                      onChange={e => setAssigneeId(e.target.value)} 
                      className='border-2 text-black bg-gray-300 border-black px-3 py-2 h-10 rounded-md w-full'
                  >
                      <option value={''}>None</option>
                      { projectMembers &&
                          projectMembers.map(user => 
                              <option value={user.id}>{user.firstName} {user.lastName}</option>
                          ) 
                      }
                  </select>
                </div>
                {/* <div className="flex flex-col gap-1">
                  <label>Reporter</label>
                  <select 
                      value={reporterId} 
                      onChange={e => setReporterId(e.target.value)} 
                      className='border-2 text-black bg-gray-300 border-black px-3 py-2 h-10 rounded-md w-full'
                  >
                      { projectMembers && 
                          projectMembers.map(user => 
                              <option value={user.id}>{user.firstName} {user.lastName}</option>
                          ) 
                      }
                  </select>
                </div> */}
              </div>
            </form>
              
            

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
                    value='Create New Issue'
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

