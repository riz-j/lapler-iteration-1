import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateIssue } from "../redux/currentProjectSlice";

export default function UpdateIssue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { issueId, projectId } = useParams();
    const token = useSelector(state => state.currentUser.token)

    const [typeOfIssue, setTypeOfIssue] = useState('');
    const [priorityOfIssue, setPriorityOfIssue] = useState('');
    const [statusOfIssue, setStatusOfIssue] = useState('');
    const [summary, setSummary] = useState('');
    const [reporterId, setReporterId] = useState('');

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
                    onChange={e => setTypeOfIssue(e.target.value)} placeholder="Issue Type" />

                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    onChange={e => setPriorityOfIssue(e.target.value)} placeholder="Priority" />

                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    onChange={e => setStatusOfIssue(e.target.value)} placeholder="Status" />

                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    onChange={e => setSummary(e.target.value)} placeholder="Summary" />

                <input type="text" className="border-2 border-black py-1 px-2 rounded-lg" 
                    onChange={e => setReporterId(e.target.value)} placeholder="Reporter" />
                    
                <input type="submit" className="border-2 border-black py-1 px-2 rounded-lg" />
            </form>
        </div>
    )
}
