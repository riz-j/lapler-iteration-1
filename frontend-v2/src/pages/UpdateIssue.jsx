import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateIssue } from "../redux/currentProjectSlice";

export default function UpdateIssue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { issueId, projectId } = useParams();
    const token = useSelector(state => state.currentUser.token);
    const projectMembers = useSelector(state => state.currentProject.users);

    const allIssues = useSelector(state => state.currentProject.issues);
    const issueToUpdate = allIssues.find(issue => issue.id === parseInt(issueId));
    useEffect(() => console.log(issueToUpdate), []);

    const [typeOfIssue, setTypeOfIssue] = useState(issueToUpdate.typeOfIssue);
    const [priorityOfIssue, setPriorityOfIssue] = useState(issueToUpdate.priorityOfIssue);
    const [statusOfIssue, setStatusOfIssue] = useState(issueToUpdate.statusOfIssue);
    const [summary, setSummary] = useState(issueToUpdate.summary);
    const [reporterId, setReporterId] = useState(issueToUpdate.reporterId);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(-1);
        dispatch(updateIssue({
            issueId: issueId, 
            typeOfIssue: typeOfIssue, 
            priorityOfIssue: priorityOfIssue, 
            statusOfIssue: statusOfIssue, 
            summary: summary, 
            projectId: projectId, 
            reporterId: reporterId, 
            token: token
        }))
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl pb-4">Create New Issue</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 w-1/3 justify-center justify-items-center">
                {/* <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    value={typeOfIssue}
                    onChange={e => setTypeOfIssue(e.target.value)} placeholder="Issue Type" /> */}
                <select type="text" value={typeOfIssue} placeholder="typeOfIssue" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setTypeOfIssue(e.target.value)}>
                    <option value="Bug">Bug</option>
                    <option value="Improvement">Improvement</option>
                    <option value="New Feature">New Feature</option>
                    <option value="Epic">Epic</option>
                    <option value="Idea">Idea</option>
                </select>

                <select type="text" value={priorityOfIssue} placeholder="priorityOfIssue" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setPriorityOfIssue(e.target.value)} >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select type="text" value={statusOfIssue} placeholder="statusOfIssue" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setStatusOfIssue(e.target.value)} >
                    <option value="Waiting">Waiting</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>

                <input type="text" value={summary} placeholder="summary" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setSummary(e.target.value)} />

                {/* <input type="text" value={reporterId} placeholder="reporterId" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setReporterId(e.target.value)} /> */}
                <select type="text" value={reporterId} placeholder="reporterId" className="border-2 border-black px-2 py-1 rounded-md w-full"
                onChange={e => setReporterId(e.target.value)} >
                    { projectMembers ? 
                        projectMembers.map(user => {
                            return <option value={user.id}>{user.firstName} {user.lastName}</option>
                        }) : <></>

                    }
                    {/* <option value="Waiting">Waiting</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option> */}
                </select>

                <input type="submit" className="border-2 border-black px-2 py-1 rounded-md w-3/4" />

                {/* <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    value={priorityOfIssue}
                    onChange={e => setPriorityOfIssue(e.target.value)} placeholder="Priority" />

                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    value={statusOfIssue}
                    onChange={e => setStatusOfIssue(e.target.value)} placeholder="Status" />

                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    value={summary}
                    onChange={e => setSummary(e.target.value)} placeholder="Summary" />

                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    value={reporterId}
                    onChange={e => setReporterId(e.target.value)} placeholder="Reporter" />

                <input type="submit" className="border-2 border-black py-1 px-2 rounded-lg" /> */}
            </form>
        </div>
    )
}
