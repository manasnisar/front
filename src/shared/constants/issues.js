export const IssueType = {
  TASK: "task",
  BUG: "bug",
  STORY: "story"
};

export const IssueStatus = {
  BLOCKED: "blocked",
  SELECTED: "selected",
  INPROGRESS: "inprogress",
  DONE: "done"
};

export const BacklogIssueStatus = {
  UNPLANNED: "unplanned",
  READY: "ready"
};

export const IssuePriority = {
  HIGHEST: "5",
  HIGH: "4",
  MEDIUM: "3",
  LOW: "2",
  LOWEST: "1"
};

export const IssueTypeCopy = {
  [IssueType.TASK]: "Task",
  [IssueType.BUG]: "Bug",
  [IssueType.STORY]: "Story"
};

export const IssueStatusCopy = {
  [IssueStatus.BLOCKED]: "Blocked",
  [IssueStatus.SELECTED]: "Selected for development",
  [IssueStatus.INPROGRESS]: "In progress",
  [IssueStatus.DONE]: "Done"
};

export const BacklogIssueStatusCopy = {
  [BacklogIssueStatus.UNPLANNED]: "Ready for sprint planning",
  [BacklogIssueStatus.READY]: "Candidates for filling sprint"
};

export const IssuePriorityCopy = {
  [IssuePriority.HIGHEST]: "Highest",
  [IssuePriority.HIGH]: "High",
  [IssuePriority.MEDIUM]: "Medium",
  [IssuePriority.LOW]: "Low",
  [IssuePriority.LOWEST]: "Lowest"
};
