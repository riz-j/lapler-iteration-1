import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createIssue } from "../redux/currentProjectSlice";

export default function CreateIssue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser);
    const projectMembers = useSelector(state => state.currentProject.users);
    const { projectId } = useParams();
    const [typeOfIssue, setTypeOfIssue] = useState('Bug');
    const [priorityOfIssue, setPriorityOfIssue] = useState('Low');
    const [statusOfIssue, setStatusOfIssue] = useState('Waiting');
    const [summary, setSummary] = useState('');
    const [assigneeId, setAssigneeId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(-1);
        dispatch(createIssue({
            token: currentUser.token,
            projectId: projectId,
            typeOfIssue: typeOfIssue,
            priorityOfIssue: priorityOfIssue,
            statusOfIssue: statusOfIssue,
            summary: summary,
            assigneeId: assigneeId
        }));
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl pb-4">Create New Issue</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 w-1/3 justify-center justify-items-center">
                <select type="text" placeholder="typeOfIssue" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setTypeOfIssue(e.target.value)} >
                    <option value="Bug">Bug</option>
                    <option value="Improvement">Improvement</option>
                    <option value="New Feature">New Feature</option>
                    <option value="Epic">Epic</option>
                    <option value="Idea">Idea</option>
                </select>

                <select type="text" placeholder="priorityOfIssue" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setPriorityOfIssue(e.target.value)} >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select type="text" placeholder="statusOfIssue" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setStatusOfIssue(e.target.value)} >
                    <option value="Waiting">Waiting</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>

                <select type="text" value={assigneeId} placeholder="assigneeId" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setAssigneeId(e.target.value)} >
                    { projectMembers ? 
                        projectMembers.map(user => {
                            return <option value={user.id}>{user.firstName} {user.lastName}</option>
                        }) : <></>
                    }
                </select>

                <input type="text" placeholder="summary" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setSummary(e.target.value)} />
                <input type="submit" className="border-2 border-black px-2 py-1 rounded-md w-3/4" />
            </form>
        </div>
    )
}