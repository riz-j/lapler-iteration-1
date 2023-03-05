/*    Sort by Issues' Priority Descending    */
export function sortByPriorityDesc(theArray) {
    const sortedArray = theArray.sort((a, b) => {
        if (a.priorityOfIssue === "High" && b.priorityOfIssue !== "High") {
            return -1; // a comes first
          } else if (a.priorityOfIssue !== "High" && b.priorityOfIssue === "High") {
            return 1; // b comes first
          } else if (a.priorityOfIssue === "Medium" && b.priorityOfIssue === "Low") {
            return -1; // a comes first
          } else if (a.priorityOfIssue === "Low" && b.priorityOfIssue === "Medium") {
            return 1; // b comes first
          } else {
            return 0; // change nothing
          }
    });
    return sortedArray;
}

/*    Sort by Issues' Priority Ascending     */
export function sortByPriorityAsc(theArray) {
  const sortedArray = theArray.sort((a, b) => {
      if (a.priorityOfIssue === "High" && b.priorityOfIssue !== "High") {
          return 1; 
        } else if (a.priorityOfIssue !== "High" && b.priorityOfIssue === "High") {
          return -1; 
        } else if (a.priorityOfIssue === "Medium" && b.priorityOfIssue === "Low") {
          return 1; 
        } else if (a.priorityOfIssue === "Low" && b.priorityOfIssue === "Medium") {
          return -1; 
        } else {
          return 0; 
        }
  });
  return sortedArray;
}

/*    Sort by Issues' Due Date Descending     */
export function sortByDueDateDesc(theArray) {
    const sortedArray = theArray.sort((a, b) => {
        if (a?.dueDate === undefined || a?.dueDate === null || a?.dueDate === "") {
          return 1; 
        }
        if (b?.dueDate === undefined || b?.dueDate === null || b?.dueDate === "") {
          return -1; 
        }    
        // const today = new Date();
        // const today_Ms = today.getTime();
        const dateB = new Date(b?.dueDate);
        const dateA = new Date(a?.dueDate);
        const date_AMs = dateA.getTime();
        const date_BMs = dateB.getTime();    
        if (date_AMs < date_BMs) { return -1 }    // a comes first
        if (date_AMs > date_BMs) { return 1 }    // b comes first
        if (date_BMs === date_AMs) { return 0 }    // change nothing
    });
    return sortedArray;
}

/*    Sort by Issues' Due Date Ascending     */
export function sortByDueDateAsc(theArray) {
  const sortedArray = theArray.sort((a, b) => {
      if (a?.dueDate === undefined || a?.dueDate === null || a?.dueDate === "") {
        return 1; 
      }
      if (b?.dueDate === undefined || b?.dueDate === null || b?.dueDate === "") {
        return -1; 
      }    
      // const today = new Date();
      // const today_Ms = today.getTime();
      const dateB = new Date(b?.dueDate);
      const dateA = new Date(a?.dueDate);
      const date_AMs = dateA.getTime();
      const date_BMs = dateB.getTime();    
      if (date_AMs > date_BMs) { return -1 }    // a comes first
      if (date_AMs < date_BMs) { return 1 }    // b comes first
      if (date_BMs === date_AMs) { return 0 }    // change nothing
  });
  return sortedArray;
}

