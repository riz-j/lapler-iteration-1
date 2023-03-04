import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { sortByPriorityDesc, sortByPriorityAsc, sortByDueDateDesc } from '../../../utils/issuesSortHandler';
import IssueCard from './IssueCard';

export default function IssuesSection() {
    const { projectId } = useParams();
    const currentUser = useSelector(state => state.currentUser)
    const currentProject = useSelector(state => state.currentProject);
    const issues = currentProject.issues;
    
    /*   URI Filter Queries   */
    const queryParams = new URLSearchParams(window.location.search);
    const active = queryParams.get('active');
    const assigned_to_me = queryParams.get('assigned_to_me');
    const reported_by_me = queryParams.get('reported_by_me');
    const resolved = queryParams.get('resolved');

    /*   URI Sort Queries   */
    const sortByPriority = queryParams.get('sort_by_priority'); // Either ASC or DESC
    const sortByDueDate = queryParams.get('sort_by_due_date');
    
    let waitingIssues = [];
    let doingIssues = [];
    let doneIssues = [];
    let backlogIssues = [];

    issues && (waitingIssues = issues.filter(issue => issue.statusOfIssue === 'Waiting'));
    issues && (doingIssues = issues.filter(issue => issue.statusOfIssue === 'Doing'));
    issues && (doneIssues = issues.filter(issue => issue.statusOfIssue === 'Done'));
    issues && (backlogIssues = issues.filter(issue => issue.statusOfIssue === 'Backlog'));
    
    /*    Filter    */
    (active === 'true') && (doneIssues = []); 

    if (assigned_to_me === 'true') {
        (waitingIssues = waitingIssues.filter(issue => issue.assigneeId === currentUser.id));
        (doingIssues = doingIssues.filter(issue => issue.assigneeId === currentUser.id));
        (doneIssues = doneIssues.filter(issue => issue.assigneeId === currentUser.id));
        (backlogIssues = backlogIssues.filter(issue => issue.assigneeId === currentUser.id));
    }
    
    if (reported_by_me === 'true') {
        (waitingIssues = waitingIssues.filter(issue => issue.reporterId === currentUser.id));
        (doingIssues = doingIssues.filter(issue => issue.reporterId === currentUser.id));
        (doneIssues = doneIssues.filter(issue => issue.reporterId === currentUser.id));
        (backlogIssues = backlogIssues.filter(issue => issue.reporterId === currentUser.id));
    }

    if (resolved == 'true') {
        waitingIssues = [];
        doingIssues = [];
        backlogIssues = [];
    }

    /*    Sort    */
    if (sortByPriority === 'DESC') { 
        waitingIssues = sortByPriorityDesc(waitingIssues);
        doingIssues = sortByPriorityDesc(doingIssues);
        doneIssues = sortByPriorityDesc(doneIssues);
        backlogIssues = sortByPriorityDesc(backlogIssues);
    };
    if (sortByPriority === 'ASC') { 
        waitingIssues = sortByPriorityAsc(waitingIssues);
        doingIssues = sortByPriorityAsc(doingIssues);
        doneIssues = sortByPriorityAsc(doneIssues);
        backlogIssues = sortByPriorityAsc(backlogIssues);
    };
    if (sortByDueDate === 'DESC') { sortByDueDateDesc(doneIssues) }

    return (
        <div>
            <div>
            { (doingIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Doing</p>
                    <p>+</p>
                </div> 
            
            }
            { doingIssues.map(issue => (
                <IssueCard 
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
            </div>
            <div>
            { (waitingIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Waiting</p>
                    <p>+</p>
                </div> 
            }
            { waitingIssues.map(issue => (
                <IssueCard 
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
            </div>
            <div>
            { (backlogIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Backlog</p>
                    <p>+</p>
                </div> 
            }
            { backlogIssues.map(issue => (
                <IssueCard 
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
            </div>
            <div>
            { (doneIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Done</p>
                    <p>+</p>
                </div> 
            }
            { doneIssues.map(issue => (
                <IssueCard 
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
        </div>
      </div>
    )
}