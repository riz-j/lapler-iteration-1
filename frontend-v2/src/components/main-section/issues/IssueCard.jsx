import { useDispatch, useSelector } from 'react-redux'
import { deleteIssue, getCurrentProject } from '../../../redux/currentProjectSlice';
import { dateParser } from '../../../utils/dateHandler';
import { ContextMenu, ContextMenuTrigger, hideMenu } from "react-contextmenu";
import { Draggable } from '../../../dnd-kit/Draggable';
import EditIssueSheet from '../../sheets/EditIssueSheet';

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
import emptyProfilePic from '../../../static/img/emptyProfilePic.png';


import { useState } from 'react';

export default function IssueCard({ projectId, issueId, typeOfIssue, priorityOfIssue, statusOfIssue, dueDate, summary, assigneeId, reporterId }) {
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.currentProject);
    const currentUser = useSelector(state => state.currentUser);

    const assignee = (currentProject.users).find(user => user.id === parseInt(assigneeId));
    const readableDate = dueDate ? dateParser(dueDate) : '';

    const [sheetPresented, setSheetPresented] = useState(false);
    const [showAssigneeNameTooltip, setShowAssigneeNameTooltip] = useState(false);

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

    const [showHint, setShowHint] = useState(false);
    const handleShowHint = () => {
        const firstRightClick = localStorage.getItem("first-right-click");
        if (firstRightClick === null) {
            showHint ? setShowHint(false) : setShowHint(true);
        }
    }
    const handleFirstRightClick = () => {
        setShowHint(false);
        localStorage.setItem("first-right-click", "true");
        console.log("first right click");
    }

    return (
        <>
        <ContextMenuTrigger id={`contextMenu${issueId}`}>
            <Draggable id={issueId}>
                <div 
                    onClick={() => hideMenu()} 
                    onMouseEnter={handleShowHint}
                    onMouseLeave={handleShowHint}
                    onContextMenu={handleFirstRightClick} 
                    className='flex mx-3 my-1 justify-between  bg-platinum-main hover:bg-[#24262a] px-5 py-2 border-2 rounded-lg border-platinum-tertiary'
                >
                
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
                            <p className='text-left'>{summary}</p> 
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
                            <img 
                                src={ assignee && assignee.profilePicture ? assignee.profilePicture : emptyProfilePic }
                                className='w-5 h-5 rounded-full'
                                onMouseEnter={() => setShowAssigneeNameTooltip(true)}
                                onMouseLeave={() => setShowAssigneeNameTooltip(false)}
                            />
                        }
                    </div>
                </div>
            </Draggable>
        </ContextMenuTrigger>

        <ContextMenu id={`contextMenu${issueId}`} >
            <div className='flex flex-col rounded-md bg-slate-800 shadow-lg w-52 py-1'>
                <button 
                    onClick={() => setSheetPresented(!sheetPresented)}
                    className='text-left px-2 py-1 hover:bg-slate-700'
                >
                    View & Edit
                </button>
                <button 
                    onClick={handleDelete}
                    className='text-left px-2 py-1 text-red-400 font-bold hover:bg-slate-700'
                >
                    Delete
                </button>
            </div>
        </ContextMenu>

        {   sheetPresented &&
                <EditIssueSheet 
                    onClick={() => setSheetPresented(!sheetPresented)}
                    onClose={() => setSheetPresented(false)}
                    projectId={ projectId }
                    issueId={ issueId }
                />
        }

        { showAssigneeNameTooltip &&
            <div className='absolute right-1 bg-platinum-tertiary px-3 py-2 rounded-md'>
                <h1 className='text-md font-semibold'>{assignee.firstName} {assignee.lastName}</h1> 
            </div>
        }

        { showHint && 
            <div className='absolute mx-20 bg-slate-700 px-3 py-2 text-md rounded-lg'>
                <h1>Right click to <b>view</b>, <b>edit</b>, or <b>delete</b></h1>
            </div>
        }

        </>
    )
}


