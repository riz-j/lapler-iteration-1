import { sortByPriorityDesc, sortByPriorityAsc, sortByDueDateDesc, sortByDueDateAsc } from "./issuesSortHandler.js";

/********************************************************************/
/*    Function takes in a Raw Query String as its first parameter.
/*    Function takes in an Array of Issues as its second paramter.
/*
/*    Function returns an array of four arrays:
/*        1. doingIssues  
/*        1. waitingIssues
/*        3. backlogIssues
/*        4. doneIssues
/********************************************************************/

function filterAndSortIssues(windowLocationSeach, issuesArray, currentUser) { // returns an array of issues
    
    const issues = issuesArray;

/********************************************************************/
/*    Separate Query String into an Key-Value Array    
/********************************************************************/

    const rawString = windowLocationSeach;
    const cleanString = rawString.substring(rawString.indexOf('?') + 1);
    const rawQuery = cleanString.split('&');

    const queryArray = rawQuery.map(item => {
        return item.split('=');
    });

    const query = queryArray.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc
    }, {})
    
    
/********************************************************************/
/*    Define the four arrays that will be returned in this function
/********************************************************************/

    let doingIssues = [];
    let waitingIssues = [];
    let backlogIssues = [];
    let doneIssues = [];
    
    if (issues === undefined) {
        return;
    }

    waitingIssues = issues.filter(issue => issue.statusOfIssue === 'Waiting');
    doingIssues = issues.filter(issue => issue.statusOfIssue === 'Doing');
    backlogIssues = issues.filter(issue => issue.statusOfIssue === 'Backlog');
    doneIssues = issues.filter(issue => issue.statusOfIssue === 'Done');

/********************************************************************/
/*    Begin Filtering
/********************************************************************/

    /* Show only ACTIVE issues */
    if (query.active === 'true') { 
        doneIssues = []; 
    }

    if (currentUser) {
        /* Show only issues ASSIGNED TO USER */
        if (query.assigned_to_me === 'true') {
            waitingIssues = waitingIssues.filter(issue => issue.assigneeId === currentUser.id);
            doingIssues = doingIssues.filter(issue => issue.assigneeId === currentUser.id);
            doneIssues = doneIssues.filter(issue => issue.assigneeId === currentUser.id);
            backlogIssues = backlogIssues.filter(issue => issue.assigneeId === currentUser.id);
        }

        /* Show issues REPORTED BY USER */
        if (query.reported_by_me === 'true') {
            waitingIssues = waitingIssues.filter(issue => issue.reporterId === currentUser.id);
            doingIssues = doingIssues.filter(issue => issue.reporterId === currentUser.id);
            doneIssues = doneIssues.filter(issue => issue.reporterId === currentUser.id);
            backlogIssues = backlogIssues.filter(issue => issue.reporterId === currentUser.id);
        }
    }

    /* Show only DONE issues */
    if (query.resolved == 'true') {
        waitingIssues = [];
        doingIssues = [];
        backlogIssues = [];
    }

/********************************************************************/
/*    Sort by Priority
/********************************************************************/

    if (query.sort_by_priority === 'DESC') { 
        console.log('joe mama')
        waitingIssues = sortByPriorityDesc(waitingIssues);
        doingIssues = sortByPriorityDesc(doingIssues);
        doneIssues = sortByPriorityDesc(doneIssues);
        backlogIssues = sortByPriorityDesc(backlogIssues);
    };
    if (query.sort_by_priority === 'ASC') { 
        waitingIssues = sortByPriorityAsc(waitingIssues);
        doingIssues = sortByPriorityAsc(doingIssues);
        doneIssues = sortByPriorityAsc(doneIssues);
        backlogIssues = sortByPriorityAsc(backlogIssues);
    };

/********************************************************************/
/*    Sort by Due Date
/********************************************************************/

    if (query.sort_by_due_date === 'DESC') {  
        sortByDueDateDesc(waitingIssues);  
        sortByDueDateDesc(doingIssues);  
        sortByDueDateDesc(doneIssues);
        sortByDueDateDesc(backlogIssues); 
    };
    if (query.sort_by_due_date === 'ASC') {  
        sortByDueDateAsc(waitingIssues);  
        sortByDueDateAsc(doingIssues);  
        sortByDueDateAsc(doneIssues);
        sortByDueDateAsc(backlogIssues); 
    };

/********************************************************************/
/*    Sort by Members
/********************************************************************/    

    if (query.assigned_to_member) {
        waitingIssues = waitingIssues.filter(issue => issue.assigneeId == query.assigned_to_member);
        doingIssues = doingIssues.filter(issue => issue.assigneeId == query.assigned_to_member);
        doneIssues = doneIssues.filter(issue => issue.assigneeId == query.assigned_to_member);
        backlogIssues = backlogIssues.filter(issue => issue.assigneeId == query.assigned_to_member);
    };
    if (query.reported_by_member) {
        waitingIssues = waitingIssues.filter(issue => issue.reporterId == query.reported_by_member);
        doingIssues = doingIssues.filter(issue => issue.reporterId == query.reported_by_member);
        doneIssues = doneIssues.filter(issue => issue.reporterId == query.reported_by_member);
        backlogIssues = backlogIssues.filter(issue => issue.reporterId == query.reported_by_member);
    };

/********************************************************************/
/*    Logger and Debugger
/********************************************************************/

    //console.log(query);

    function _logger() {
        console.log(`\n ---- waitingIssues: ---- \n`);
        waitingIssues.map(item => console.log(item))
        console.log(`\n ---- doingIssues: ---- \n`);
        doingIssues.map(item => console.log(item))
        console.log(`\n ---- backlogIssues: ---- \n`);
        backlogIssues.map(item => console.log(item))
        console.log(`\n ---- doneIssues: ---- \n`);
        doneIssues.map(item => console.log(item))

        console.log(`waitingIssues: ${waitingIssues}`);
        console.log(`doingIssues: ${doingIssues}`);
        console.log(`backlogIssues: ${backlogIssues}`);
        console.log(`doneIssues: ${doneIssues}`);
    }
    _logger()
}

const issues = [
    {
      id: 115,
      typeOfIssue: 'Bug',
      priorityOfIssue: 'Low',
      statusOfIssue: 'Backlog',
      summary: 'Catch me outside how bout dat',
      imageUrl: null,
      dueDate: null,
      createdAt: '2023-02-26T09:09:36.633304Z',
      updatedAt: '2023-03-27T03:14:05.606855Z',
      projectId: 94,
      assigneeId: 12,
      reporterId: 18
    },
    {
      id: 104,
      typeOfIssue: 'New Feature',
      priorityOfIssue: 'Low',
      statusOfIssue: 'Doing',
      summary: 'Try again',
      imageUrl: null,
      dueDate: null,
      createdAt: '2023-02-17T07:10:56.156659Z',
      updatedAt: '2023-03-27T03:14:04.384359Z',
      projectId: 94,
      assigneeId: null,
      reporterId: 18
    },
    {
      id: 116,
      typeOfIssue: 'Improvement',
      priorityOfIssue: 'Low',
      statusOfIssue: 'Doing',
      summary: 'I\'m without care',
      imageUrl: null,
      dueDate: null,
      createdAt: '2023-02-26T09:45:57.835325Z',
      updatedAt: '2023-03-27T03:14:00.538762Z',
      projectId: 94,
      assigneeId: 12,
      reporterId: 18
    },
    {
      id: 105,
      typeOfIssue: 'Bug',
      priorityOfIssue: 'Medium',
      statusOfIssue: 'Done',
      summary: 'Hello hello',
      imageUrl: null,
      dueDate: null,
      createdAt: '2023-02-17T07:25:16.1727Z',
      updatedAt: '2023-03-27T01:29:25.542818Z',
      projectId: 94,
      assigneeId: null,
      reporterId: 18
    },
    {
      id: 112,
      typeOfIssue: 'Bug',
      priorityOfIssue: 'High',
      statusOfIssue: 'Waiting',
      summary: 'Hello there',
      imageUrl: null,
      dueDate: null,
      createdAt: '2023-02-26T05:26:56.479437Z',
      updatedAt: '2023-03-27T03:13:47.257668Z',
      projectId: 94,
      assigneeId: null,
      reporterId: 18
    },
    {
      id: 102,
      typeOfIssue: 'Bug',
      priorityOfIssue: 'Low',
      statusOfIssue: 'Waiting',
      summary: 'Hello',
      imageUrl: null,
      dueDate: null,
      createdAt: '2023-02-17T07:08:32.225183Z',
      updatedAt: '2023-03-27T01:30:57.107695Z',
      projectId: 94,
      assigneeId: null,
      reporterId: 18
    }
  ]    

// window.location.search
filterAndSortIssues('?sort_by_priiority=ASC&sort_by_priority=ASC', 
                    issues, {id: 12});











