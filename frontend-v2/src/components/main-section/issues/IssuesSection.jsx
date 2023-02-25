import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import IssueCard from './IssueCard';

export default function IssuesSection() {
    const { projectId } = useParams();
    const currentProject = useSelector(state => state.currentProject);

    const issues = currentProject.issues;
    if (issues) {
        const waitingIssues = issues.filter(issue => issue.statusOfIssue === 'Waiting');
        console.log(waitingIssues);
    } else {
        console.log('No issues found');
    }
      
      
      

    return (
        <div>
            <div>
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>In Progress</p>
                    <p>+</p>
                </div>
            {(currentProject.issues && currentProject.issues.length > 0) ? (
                currentProject.issues
                .filter(issue => issue.statusOfIssue === 'Doing')
                .map(issue => (
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
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Waiting</p>
                    <p>+</p>
                </div>
            {(currentProject.issues && currentProject.issues.length > 0) ? (
                currentProject.issues
                .filter(issue => issue.statusOfIssue === 'Waiting')
                .map(issue => (
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
            {/* <div>
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Backlog</p>
                    <p>+</p>
                </div>
            {(currentProject.issues && currentProject.issues.length > 0) ? (
                currentProject.issues
                .filter(issue => issue.statusOfIssue === 'Backlog')
                .map(issue => (
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
            </div> */}
            <div>
                <div className='flex justify-between items-center h-7 px-3 w-full bg-[#242529] border-b border-[#515151]'>
                    <p>Done</p>
                    <p>+</p>
                </div>
            {(currentProject.issues && currentProject.issues.length > 0) ? (
            currentProject.issues
            .filter(issue => issue.statusOfIssue === 'Done')
            .map(issue => (
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