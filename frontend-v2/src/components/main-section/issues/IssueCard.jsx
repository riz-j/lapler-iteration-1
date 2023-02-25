import { useDispatch, useSelector } from 'react-redux'
import { deleteIssue, getCurrentProject } from '../../../redux/currentProjectSlice';
import { dateParser } from '../../../utils/dateHandler';
import { Link } from 'react-router-dom';

import InProgressIcon from '../../../static/img/InProgressIcon.png';
import WaitingIcon from '../../../static/img/WaitingIcon.png';
import BacklogIcon from '../../../static/img/BacklogIcon.png';
import DoneIcon2 from '../../../static/img/DoneIcon2.png';
import LowPriorityIcon from '../../../static/img/LowPriorityIcon.png';
import MediumPriorityIcon from '../../../static/img/MediumPriorityIcon.png';
import HighPriorityIcon from '../../../static/img/HighPriorityIcon.png';
import GreenDot from '../../../static/img/GreenDot.png';
import YellowDot from '../../../static/img/YellowDot.png';
import BlueDot from '../../../static/img/BlueDot.png';
import BugIcon from '../../../static/img/BugIcon.png';
import RedCalendarIcon from '../../../static/img/RedCalendarIcon.png';


import { useState } from 'react';

export default function IssueCard({ projectId, issueId, typeOfIssue, priorityOfIssue, statusOfIssue, dueDate, summary, assigneeId, reporterId }) {
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.currentProject);
    const currentUser = useSelector(state => state.currentUser);

    const reporter = (currentProject.users).find(user => user.id === parseInt(reporterId));
    const assignee = (currentProject.users).find(user => user.id === parseInt(assigneeId));
    const readableDate = dueDate ? dateParser(dueDate) : '';

    const [statusOfIssueImg, setStatusOfIssueImg] = useState('');
    
    // if(statusOfIssue.toLowerCase() == 'backlog') { 
    //     setStatusOfIssueImg(BacklogIcon)
    // } else if (statusOfIssue.toLowerCase() == 'doing') {
    //     setStatusOfIssueImg(InProgressIcon)
    // } else if (statusOfIssue.toLowerCase() == 'waiting') {
    //     setStatusOfIssueImg(WaitingIcon)
    // }


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
        <div className='flex justify-between h-10 bg-[#1C1D21] px-5 py-2 border-b border-[#515151]'>

            <div className='col-span-10 flex justify-start items-center space-x-4 '>
                {/* <p className='font-bold'>{priorityOfIssue}</p> */}
                <img src={
                    priorityOfIssue == 'Low' && LowPriorityIcon ||
                    priorityOfIssue == 'Medium' && MediumPriorityIcon ||
                    priorityOfIssue == 'High' && HighPriorityIcon
                }
                className='w-3 h-3' />
                <p className='text-[#A8A9AD]'>{issueId}</p>
                {/* <p className='italic'>{statusOfIssue}</p> */}
                <img 
                    src={
                        statusOfIssue == 'Waiting' && WaitingIcon ||
                        statusOfIssue == 'Doing' && InProgressIcon ||
                        statusOfIssue == 'Done' && DoneIcon2 ||
                        statusOfIssue == 'Backlog' && BacklogIcon 
                    } 
                    className="w-3 h-3" />
                <p>{summary}</p>
                {/* { readableDate && <p>{readableDate}</p> }
                <p>{typeOfIssue}</p>
                { assignee && <p>{assignee.firstName} {assignee.lastName}</p> }     
                <p>{reporter.firstName} {reporter.lastName}</p> */}
            </div>

            <div className='flex justify-end items-center gap-1 text-sm'>
                { readableDate && 
                    <div className='flex justify-around items-center gap-1 border border-[#515151] px-1 py-0.5 rounded'>
                        <img src={RedCalendarIcon} 
                        className='w-3 h-3'/>
                        <p>{readableDate}</p>
                    </div> 
                }
                { typeOfIssue && 
                    <div className='flex justify-around items-center gap-1 border border-[#515151] px-1 py-0.5 rounded'>
                        <img src={
                            typeOfIssue === 'Bug' && BugIcon ||
                            typeOfIssue === 'Improvement' && GreenDot ||
                            typeOfIssue === 'Epic' && YellowDot ||
                            typeOfIssue === 'New Feature' && BlueDot 
                        }
                        className='w-2.5 h-2.5'/>
                        <p>{typeOfIssue}</p>
                    </div> 
                }
                { assignee && 
                    <p>{assignee.firstName} {assignee.lastName}</p> 
                }   
                { reporter && 
                    <p>{reporter.firstName} {reporter.lastName}</p> 
                }    
            </div>

            {/* <button 
                onClick={handleDelete}
                className='col-span-1 flex justify-center text-2xl text-red-500'
            >
                x
            </button> 

            <Link to={`/dashboard/project/${projectId}/issues/${issueId}/update`}>
                <button className='col-span-1 flex justify-center text-xl text-green-500'>
                    Edit
                </button> 
            </Link> */}

        </div>
    )
}



{/* <div className='grid grid-cols-12'>

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

</div> */}