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


