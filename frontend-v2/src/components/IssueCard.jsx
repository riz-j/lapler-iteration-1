import { useDispatch, useSelector } from "react-redux"
import { deleteIssue, getCurrentProject } from "../redux/currentProjectSlice";
import { Link } from "react-router-dom";

export default function IssueCard({ projectId, issueId, typeOfIssue, priorityOfIssue, statusOfIssue, summary, reporterId }) {
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
            <div className="col-span-10 flex space-x-4 bg-blue-200 px-5 py-2 rounded-lg border-b-2">
                <p className="">{issueId}</p>
                <p className="">{typeOfIssue}</p>
                <p className="font-bold">{priorityOfIssue}</p>
                <p className="italic">{statusOfIssue}</p>
                <p className="">{summary}</p>
                <p className="">{reporterId}</p>
            </div>
            <button className="col-span-1 flex justify-center text-2xl text-red-500"
            onClick={handleDelete}>
                x
            </button> 
            <Link to={`/dashboard/project/${projectId}/issues/${issueId}/update`}>
                <button className="col-span-1 flex justify-center text-xl text-green-500">
                    Edit
                </button> 
            </Link>
        </div>
    )
}