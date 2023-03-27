
function filterAndSortIssues() {
    // window.location.search
    // '?reported_by_me=true&resolved=true&assigned_to_me=true'

    /*   URI Filter Queries   */
    const queryParams = new URLSearchParams(window.location.search);
    const active = queryParams.get('active');
    const assigned_to_me = queryParams.get('assigned_to_me');
    const reported_by_me = queryParams.get('reported_by_me');
    const resolved = queryParams.get('resolved');
    
    /*   URI Sort Queries   */
    const sortByPriority = queryParams.get('sort_by_priority'); // Either ASC or DESC
    const sortByDueDate = queryParams.get('sort_by_due_date');
    const assigned_to_member = queryParams.get('assigned_to_member'); // Member User ID
    const reported_by_member = queryParams.get('reported_by_member'); // Member User ID
    
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
    if (sortByDueDate === 'DESC') {  
        sortByDueDateDesc(waitingIssues);  
        sortByDueDateDesc(doingIssues);  
        sortByDueDateDesc(doneIssues);
        sortByDueDateDesc(backlogIssues); 
    };
    if (sortByDueDate === 'ASC') {  
        sortByDueDateAsc(waitingIssues);  
        sortByDueDateAsc(doingIssues);  
        sortByDueDateAsc(doneIssues);
        sortByDueDateAsc(backlogIssues); 
    };

    /*   Filter assignee and reporter   */
    if (assigned_to_member) {
        waitingIssues = waitingIssues.filter(issue => issue.assigneeId == assigned_to_member);
        doingIssues = doingIssues.filter(issue => issue.assigneeId == assigned_to_member);
        doneIssues = doneIssues.filter(issue => issue.assigneeId == assigned_to_member);
        backlogIssues = backlogIssues.filter(issue => issue.assigneeId == assigned_to_member);
    }
    if (reported_by_member) {
        waitingIssues = waitingIssues.filter(issue => issue.reporterId == reported_by_member);
        doingIssues = doingIssues.filter(issue => issue.reporterId == reported_by_member);
        doneIssues = doneIssues.filter(issue => issue.reporterId == reported_by_member);
        backlogIssues = backlogIssues.filter(issue => issue.reporterId == reported_by_member);
    }
};
