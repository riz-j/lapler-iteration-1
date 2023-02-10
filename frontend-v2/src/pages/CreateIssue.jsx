import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createIssue } from "../redux/currentProjectSlice";

export default function CreateIssue() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const { projectId } = useParams();
    const [typeOfIssue, setTypeOfIssue] = useState('');
    const [priorityOfIssue, setPriorityOfIssue] = useState('');
    const [statusOfIssue, setStatusOfIssue] = useState('');
    const [summary, setSummary] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createIssue({
            token: currentUser.token,
            projectId: projectId,
            typeOfIssue: typeOfIssue,
            priorityOfIssue: priorityOfIssue,
            statusOfIssue: statusOfIssue,
            summary: summary
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="typeOfIssue" onChange={e => setTypeOfIssue(e.target.value)} />
            <input type="text" placeholder="priorityOfIssue" onChange={e => setPriorityOfIssue(e.target.value)} />
            <input type="text" placeholder="statusOfIssue" onChange={e => setStatusOfIssue(e.target.value)} />
            <input type="text" placeholder="summary" onChange={e => setSummary(e.target.value)} />
            <input type="submit" />
        </form>
    )
}