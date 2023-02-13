import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateIssue } from "../redux/currentProjectSlice";

export default function UpdateIssue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { issueId, projectId } = useParams();
    const token = useSelector(state => state.currentUser.token)

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
        <div className="flex justify-center items-center h-screen w-screen">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 w-1/3">
                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    value={typeOfIssue}
                    onChange={e => setTypeOfIssue(e.target.value)} placeholder="Issue Type" />

                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
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

                <input type="submit" className="border-2 border-black py-1 px-2 rounded-lg" />
            </form>
        </div>
    )
}
