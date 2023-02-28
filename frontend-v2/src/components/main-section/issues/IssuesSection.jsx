import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import IssueCard from './IssueCard';

export default function IssuesSection() {
    const { projectId } = useParams();
    
    // Queries: 
    const queryParams = new URLSearchParams(window.location.search);
    const active = queryParams.get('active');

    const currentProject = useSelector(state => state.currentProject);
    const issues = currentProject.issues;
    
    let waitingIssues = [];
    let doingIssues = [];
    let doneIssues = [];
    let backlogIssues = [];

    issues && (waitingIssues = issues.filter(issue => issue.statusOfIssue === 'Waiting'));
    issues && (doingIssues = issues.filter(issue => issue.statusOfIssue === 'Doing'));
    issues && (doneIssues = issues.filter(issue => issue.statusOfIssue === 'Done'));
    issues && (backlogIssues = issues.filter(issue => issue.statusOfIssue === 'Backlog'));
    
    (active === 'true') && (doneIssues = []);

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