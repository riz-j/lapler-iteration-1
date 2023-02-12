import { useDispatch, useSelector } from "react-redux"
import { deleteIssue, getCurrentProject } from "../redux/currentProjectSlice";

export default function IssueCard({ projectId, issueId, typeOfIssue, priorityOfIssue, statusOfIssue, summary }) {
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.currentProject);
    const currentUser = useSelector(state => state.currentUser);

    const handleDelete = async () => {
        await dispatch(deleteIssue({
            projectId: projectId, 
            issueId: issueId, 
            token: currentUser.token}))
        await dispatch(getCurrentProject({ 
            projectId: projectId, 
            token: currentUser.token 
        }))
        .then(() =>
            navigate(window.location.pathname, { replace: true })
        )
    }

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-11 flex space-x-4 bg-blue-200 px-5 py-2 rounded-lg border-b-2">
                <p>{issueId}</p>
                <p>{typeOfIssue}</p>
                <p>{priorityOfIssue}</p>
                <p>{statusOfIssue}</p>
                <p>{summary}</p>
            </div>
            <button className="col-span-1 flex justify-center text-2xl text-red-500"
            onClick={handleDelete}>
                x
            </button> 
        </div>
    )
}