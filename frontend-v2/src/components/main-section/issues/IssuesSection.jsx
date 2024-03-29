import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Droppable } from '../../../dnd-kit/Droppable';
import {DndContext} from '@dnd-kit/core';
import { filterAndSortIssues } from '../../../utils/filterAndSortIssues';
import { getCurrentProject, updateIssue } from '../../../redux/currentProjectSlice';
import IssueCard from './IssueCard';

export default function IssuesSection() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser)
    const currentProject = useSelector(state => state.currentProject);
    const searchState = useSelector(state => state.search.searchState);
    const _issues = useSelector(state => state.currentProject.issues);
    let [issues, setIssues] = useState(_issues);

    useEffect(() => {
        setIssues(currentProject.issues);
    }, [currentProject.issues]);

/**********   Search   **********/
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (window.location.search !== ''){
            navigate(`/dashboard/project/${projectId}`);
        }
    }, [search])

    if (issues) { 
        issues = issues.filter(issue => 
            issue.summary.toLowerCase()
            .includes(search.toLowerCase())
        );
    };
/**********  Search END   **********/
    
    let doingIssues = filterAndSortIssues(window.location.search, issues, currentUser)[0];
    let waitingIssues = filterAndSortIssues(window.location.search, issues, currentUser)[1]; 
    let backlogIssues = filterAndSortIssues(window.location.search, issues, currentUser)[2];
    let doneIssues = filterAndSortIssues(window.location.search, issues, currentUser)[3];   

/**********   handleDragEnd   **********/
    async function handleDragEnd(event) {
        const newParent = (event.over !== null) ? event.over.id : null
        const activeId = event.active.id;
        console.log(`active: ${event.active.id}`);
        console.log(`over: ${event.over.id}`);

        console.log(newParent);

        if (newParent === null) {
            return;
        }

        if (newParent !== 'Doing' && newParent !== 'Waiting' && newParent !== 'Backlog' && newParent !== 'Done') {
            return;
        }

        const updatedIssues = issues.map(issue => {
            if (issue.id === activeId) {
              return { ...issue, statusOfIssue: newParent };
            }
            return issue;
        });

        setIssues(updatedIssues);
        
        const token = currentUser.token;
        const _issue = updatedIssues.find(issue => issue.id === activeId)
        await dispatch(updateIssue({
            issueId: activeId, 
            typeOfIssue: _issue.typeOfIssue, 
            priorityOfIssue: _issue.priorityOfIssue, 
            statusOfIssue: _issue.statusOfIssue, 
            summary: _issue.summary, 
            projectId: _issue.projectId, 
            dueDate: _issue.toggleDueDate ? _issue.dueDate : null,
            assigneeId: (_issue.assigneeId !== "") ? _issue.assigneeId : null,
            reporterId: _issue.reporterId, 
            token: token
        }))
        .then(() => dispatch(getCurrentProject({
            projectId: projectId,
            token: token
        })))
        .catch(err => console.log(err));
    }
/**********   handleDragEnd END   **********/

    return (
        <div>
            { searchState && 
                <div className='flex justify-center px-10 py-3'>
                    <input 
                        onChange={e => setSearch(e.target.value)} 
                        placeholder='Search'
                        className='p-2 w-[100%] rounded-lg bg-transparent border border-gray-500 text-white text-lg'
                    />
                </div>
            }
            <DndContext onDragEnd={handleDragEnd}>
            <div> 
            { (doingIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-platinum-secondary border-b border-platinum-tertiary'>
                    <p>Doing</p>
                </div>        
            }
            
            <Droppable key={'Doing'} id={'Doing'}>
                { doingIssues.map(issue => (
                    <IssueCard 
                        key={issue.id}
                        projectId={projectId}
                        issueId={issue.id} 
                        typeOfIssue={issue.typeOfIssue} 
                        priorityOfIssue={issue.priorityOfIssue} 
                        statusOfIssue={issue.statusOfIssue} 
                        summary={issue.summary}
                        dueDate={issue.dueDate}
                        assigneeId={issue.assigneeId}
                        reporterId={issue.reporterId}
                    /> 
                ))
                }
            </Droppable>
            
            </div>
            <div>
            { (waitingIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-platinum-secondary border-b border-t border-platinum-tertiary'>
                    <p>Waiting</p>
                </div> 
            }
            <Droppable key={'Waiting'} id={'Waiting'}>
                { waitingIssues.map(issue => (
                    <IssueCard 
                        key={issue.id}
                        projectId={projectId}
                        issueId={issue.id} 
                        typeOfIssue={issue.typeOfIssue} 
                        priorityOfIssue={issue.priorityOfIssue} 
                        statusOfIssue={issue.statusOfIssue} 
                        summary={issue.summary}
                        dueDate={issue.dueDate}
                        assigneeId={issue.assigneeId}
                        reporterId={issue.reporterId}
                    /> 
                ))
                }
            </Droppable>
            </div>
            <div>
                { (backlogIssues.length > 0) &&
                    <>
                    <div className='flex justify-between items-center h-7 px-3 w-full bg-platinum-secondary border-b border-t border-platinum-tertiary'>
                        <p>Backlog</p>
                    </div> 
                
                    <Droppable key={'Backlog'} id={'Backlog'}>
                        { backlogIssues.map(issue => (
                            <IssueCard 
                                key={issue.id}
                                projectId={projectId}
                                issueId={issue.id} 
                                typeOfIssue={issue.typeOfIssue} 
                                priorityOfIssue={issue.priorityOfIssue} 
                                statusOfIssue={issue.statusOfIssue} 
                                summary={issue.summary}
                                dueDate={issue.dueDate}
                                assigneeId={issue.assigneeId}
                                reporterId={issue.reporterId}
                            /> 
                        ))
                        }
                    </Droppable>
                    </>
                }
            </div>
            <div>
            { (doneIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-platinum-secondary border-b border-t border-platinum-tertiary'>
                    <p>Done</p>
                </div> 
            }
            <Droppable key={'Done'} id={'Done'}>
                { doneIssues.map(issue => (
                    <IssueCard 
                        key={issue.id}
                        projectId={projectId}
                        issueId={issue.id} 
                        typeOfIssue={issue.typeOfIssue} 
                        priorityOfIssue={issue.priorityOfIssue} 
                        statusOfIssue={issue.statusOfIssue} 
                        summary={issue.summary}
                        dueDate={issue.dueDate}
                        assigneeId={issue.assigneeId}
                        reporterId={issue.reporterId}
                    /> 
                ))
                }
            </Droppable>
        </div>
        </DndContext>
      </div>
    )
}




    // /*   URI Filter Queries   */
    // const queryParams = new URLSearchParams(window.location.search);
    // const active = queryParams.get('active');
    // const assigned_to_me = queryParams.get('assigned_to_me');
    // const reported_by_me = queryParams.get('reported_by_me');
    // const resolved = queryParams.get('resolved');
    
    // /*   URI Sort Queries   */
    // const sortByPriority = queryParams.get('sort_by_priority'); // Either ASC or DESC
    // const sortByDueDate = queryParams.get('sort_by_due_date');
    // const assigned_to_member = queryParams.get('assigned_to_member'); // Member User ID
    // const reported_by_member = queryParams.get('reported_by_member'); // Member User ID
    
    // let waitingIssues = [];
    // let doingIssues = [];
    // let doneIssues = [];
    // let backlogIssues = [];

    // issues && (waitingIssues = issues.filter(issue => issue.statusOfIssue === 'Waiting'));
    // issues && (doingIssues = issues.filter(issue => issue.statusOfIssue === 'Doing'));
    // issues && (doneIssues = issues.filter(issue => issue.statusOfIssue === 'Done'));
    // issues && (backlogIssues = issues.filter(issue => issue.statusOfIssue === 'Backlog'));
    
    // /*    Filter    */
    // (active === 'true') && (doneIssues = []); 

    // if (assigned_to_me === 'true') {
    //     (waitingIssues = waitingIssues.filter(issue => issue.assigneeId === currentUser.id));
    //     (doingIssues = doingIssues.filter(issue => issue.assigneeId === currentUser.id));
    //     (doneIssues = doneIssues.filter(issue => issue.assigneeId === currentUser.id));
    //     (backlogIssues = backlogIssues.filter(issue => issue.assigneeId === currentUser.id));
    // }
    
    // if (reported_by_me === 'true') {
    //     (waitingIssues = waitingIssues.filter(issue => issue.reporterId === currentUser.id));
    //     (doingIssues = doingIssues.filter(issue => issue.reporterId === currentUser.id));
    //     (doneIssues = doneIssues.filter(issue => issue.reporterId === currentUser.id));
    //     (backlogIssues = backlogIssues.filter(issue => issue.reporterId === currentUser.id));
    // }

    // if (resolved == 'true') {
    //     waitingIssues = [];
    //     doingIssues = [];
    //     backlogIssues = [];
    // }

    // /*    Sort    */
    // if (sortByPriority === 'DESC') { 
    //     waitingIssues = sortByPriorityDesc(waitingIssues);
    //     doingIssues = sortByPriorityDesc(doingIssues);
    //     doneIssues = sortByPriorityDesc(doneIssues);
    //     backlogIssues = sortByPriorityDesc(backlogIssues);
    // };
    // if (sortByPriority === 'ASC') { 
    //     waitingIssues = sortByPriorityAsc(waitingIssues);
    //     doingIssues = sortByPriorityAsc(doingIssues);
    //     doneIssues = sortByPriorityAsc(doneIssues);
    //     backlogIssues = sortByPriorityAsc(backlogIssues);
    // };
    // if (sortByDueDate === 'DESC') {  
    //     sortByDueDateDesc(waitingIssues);  
    //     sortByDueDateDesc(doingIssues);  
    //     sortByDueDateDesc(doneIssues);
    //     sortByDueDateDesc(backlogIssues); 
    // };
    // if (sortByDueDate === 'ASC') {  
    //     sortByDueDateAsc(waitingIssues);  
    //     sortByDueDateAsc(doingIssues);  
    //     sortByDueDateAsc(doneIssues);
    //     sortByDueDateAsc(backlogIssues); 
    // };

    // /*   Filter assignee and reporter   */
    // if (assigned_to_member) {
    //     waitingIssues = waitingIssues.filter(issue => issue.assigneeId == assigned_to_member);
    //     doingIssues = doingIssues.filter(issue => issue.assigneeId == assigned_to_member);
    //     doneIssues = doneIssues.filter(issue => issue.assigneeId == assigned_to_member);
    //     backlogIssues = backlogIssues.filter(issue => issue.assigneeId == assigned_to_member);
    // }
    // if (reported_by_member) {
    //     waitingIssues = waitingIssues.filter(issue => issue.reporterId == reported_by_member);
    //     doingIssues = doingIssues.filter(issue => issue.reporterId == reported_by_member);
    //     doneIssues = doneIssues.filter(issue => issue.reporterId == reported_by_member);
    //     backlogIssues = backlogIssues.filter(issue => issue.reporterId == reported_by_member);
    // }