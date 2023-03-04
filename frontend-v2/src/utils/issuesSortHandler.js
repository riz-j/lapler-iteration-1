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
    const today = new Date();
    const sortedArray = theArray.sort((a, b) => {
        const dateB = new Date(b.dueDate);
        const dateA = new Date(a.dueDate);

        const diffA = Math.abs(dateA - today);
        const diffB = Math.abs(dateB - today);
      
        return diffA - diffB;
    });
    return sortedArray;
}