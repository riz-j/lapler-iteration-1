import { useDispatch, useSelector } from 'react-redux'
import { deleteIssue, getCurrentProject } from '../redux/currentProjectSlice';
import { dateParser } from '../utils/dateHandler';
import { Link } from 'react-router-dom';

export default function IssueCard({ projectId, issueId, typeOfIssue, priorityOfIssue, statusOfIssue, dueDate, summary, assigneeId, reporterId }) {
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.currentProject);
    const currentUser = useSelector(state => state.currentUser);

    const reporter = (currentProject.users).find(user => user.id === parseInt(reporterId));
    const assignee = (currentProject.users).find(user => user.id === parseInt(assigneeId));
    const readableDate = dueDate ? dateParser(dueDate) : '';
    
    const line_style = (statusOfIssue === 'Done') ? 'line-through' : '';

    const handleDelete = async () => {
        await dispatch(deleteIssue({
            projectId: projectId, 
            issueId: issueId, 
            token: currentUser.token}))
        .then(() => dispatch(getCurrentProject({ 
            projectId: projectId, 
            token: currentUser.token 
        })))
        .then(() => navigate(
            window.location.pathname, 
            { replace: true }
        ))
        .catch(err => console.log(err));
    }

    return (
        <div className='grid grid-cols-12'>

            <div className='col-span-10 flex space-x-4 bg-blue-200 px-5 py-2 rounded-lg border-b-2'>
                <p>{issueId}</p>
                <p>{typeOfIssue}</p>
                <p className='font-bold'>{priorityOfIssue}</p>
                <p className='italic'>{statusOfIssue}</p>
                <p className={line_style}>{summary}</p>
                { readableDate && <p>{readableDate}</p> }
                { assignee && <p>{assignee.firstName} {assignee.lastName}</p> }     
                <p>{reporter.firstName} {reporter.lastName}</p>
            </div>

            <button 
                onClick={handleDelete}
                className='col-span-1 flex justify-center text-2xl text-red-500'
            >
                x
            </button> 

            <Link to={`/dashboard/project/${projectId}/issues/${issueId}/update`}>
                <button className='col-span-1 flex justify-center text-xl text-green-500'>
                    Edit
                </button> 
            </Link>

        </div>
    )
}