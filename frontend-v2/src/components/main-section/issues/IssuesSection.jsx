import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import IssueCard from './IssueCard';

export default function IssuesSection() {
    const { projectId } = useParams();
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
          
    return (
        <div>
            <div>
            { (doingIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Doing</p>
                    <p>+</p>
                </div> 
            }
            {(doingIssues) ? (
                doingIssues.map(issue => (
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
                ) : (
                    <h1>This project is empty</h1>
                )}
            </div>
            <div>
            { (waitingIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Waiting</p>
                    <p>+</p>
                </div> 
            }
            {(waitingIssues) ? (
                waitingIssues.map(issue => (
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
                ) : (
                    <h1>This project is empty</h1>
                )}
            </div>
            <div>
            { (backlogIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Backlog</p>
                    <p>+</p>
                </div> 
            }
            {(backlogIssues) ? (
                backlogIssues.map(issue => (
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
                ) : (
                    <h1>This project is empty</h1>
                )}
            </div>
            <div>
            { (doneIssues.length > 0) &&
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Done</p>
                    <p>+</p>
                </div> 
            }
            {(doneIssues) ? (
                doneIssues.map(issue => (
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
            ) : (
                <h1>This project is empty</h1>
            )}
        </div>
      </div>
    )
}