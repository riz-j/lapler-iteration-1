/*    Sort by Issues' Priority Descending   */
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

/*    Sort by Issues' Priority Ascending    */
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