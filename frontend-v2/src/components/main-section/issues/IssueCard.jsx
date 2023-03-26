import { useDispatch, useSelector } from 'react-redux'
import { deleteIssue, getCurrentProject } from '../../../redux/currentProjectSlice';
import { dateParser } from '../../../utils/dateHandler';
import { Link } from 'react-router-dom';
import { ContextMenu, ContextMenuTrigger, MenuItem, hideMenu } from "react-contextmenu";

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

    const handleDelete = async () => {
        hideMenu();
        
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

    const handleClick = (e, data) => {
        console.log(`Clicked on ${data.item}`);
    };

    return (
        <>
        <ContextMenuTrigger id={`contextMenu${issueId}`}>
        <div onClick={() => hideMenu()} className='flex mx-3 my-2 justify-between h-10 bg-platinum-main hover:bg-[#24262a] px-5 py-2 border-2 rounded-lg border-platinum-tertiary'>
        
            <div className='col-span-10 flex justify-start items-center space-x-4 '>
                <div className='flex justify-center w-6'>
                    <img src={
                        priorityOfIssue == 'Low' && LowPriorityIcon ||
                        priorityOfIssue == 'Medium' && MediumPriorityIcon ||
                        priorityOfIssue == 'High' && HighPriorityIcon
                    }
                    className='w-3 h-3' />
                </div>
                <div className='flex justify-center w-3'>
                    <p className='text-font-color-secondary'>{issueId}</p>
                </div>
                <div className='flex justify-center w-6'>
                    <img 
                        src={
                            statusOfIssue == 'Waiting' && WaitingIcon ||
                            statusOfIssue == 'Doing' && InProgressIcon ||
                            statusOfIssue == 'Done' && DoneIcon2 ||
                            statusOfIssue == 'Backlog' && BacklogIcon 
                        } 
                        className="w-3 h-3" 
                    />
                </div>
                <div>
                    <p>{summary}</p> 
                </div>
            </div>

            <div className='flex justify-end items-center gap-1 text-sm'>
                { readableDate && 
                    <div className='flex justify-around items-center gap-1 border border-platinum-tertiary px-1 py-0.5 rounded'>
                        <img src={RedCalendarIcon} 
                        className='w-3 h-3'/>
                        <p>{readableDate}</p>
                    </div> 
                }
                { typeOfIssue && 
                    <div className='flex justify-around items-center gap-1 border border-platinum-tertiary px-1 py-0.5 rounded'>
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
        </div>
        </ContextMenuTrigger>

        <ContextMenu id={`contextMenu${issueId}`} className='flex flex-col border rounded-sm'>
            <button 
                onClick={() => { window.location.href = `/dashboard/project/${projectId}/issues/${issueId}/update`}}
                className='px-2 py-1 border-b bg-slate-700 hover:bg-slate-600'
            >
                Edit
            </button>
            <button 
                onClick={handleDelete}
                className='px-2 py-1 text-red-400 font-bold bg-slate-700 hover:bg-slate-600'
            >
                Delete
            </button>
        </ContextMenu>
        </>
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