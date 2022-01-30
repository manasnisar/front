export const IssueType = {
  TASK: "task",
  BUG: "bug",
  STORY: "story"
};

export const IssueStatus = {
  BLOCKED: "blocked",
  SELECTED: "ready",
  INPROGRESS: "inProgress",
  INQA: "inQa",
  DONE: "done"
};

export const BacklogIssueStatus = {
  UNPLANNED: "unplanned",
  PLANNED: "planned"
};

export const HistoryIssueStatus = {
  ARCHIVED: "archived"
};

export const IssuePriority = {
  HIGHEST: "5",
  HIGH: "4",
  MEDIUM: "3",
  LOW: "2",
  LOWEST: "1"
};

export const EpicPriority = {
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
  [IssueStatus.SELECTED]: "Ready for development",
  [IssueStatus.INPROGRESS]: "In progress",
  [IssueStatus.INQA]: "In QA",
  [IssueStatus.DONE]: "Done"
};

export const BacklogIssueStatusCopy = {
  [BacklogIssueStatus.UNPLANNED]: "Ready for sprint planning",
  [BacklogIssueStatus.PLANNED]: "Candidates for filling sprint"
};

export const HistoryIssueStatusCopy = {
  [HistoryIssueStatus.ARCHIVED]: "Archived"
};

export const IssuePriorityCopy = {
  [IssuePriority.HIGHEST]: "Highest",
  [IssuePriority.HIGH]: "High",
  [IssuePriority.MEDIUM]: "Medium",
  [IssuePriority.LOW]: "Low",
  [IssuePriority.LOWEST]: "Lowest"
};

export const EpicPriorityCopy = {
  [EpicPriority.HIGHEST]: "Highest",
  [EpicPriority.HIGH]: "High",
  [EpicPriority.MEDIUM]: "Medium",
  [EpicPriority.LOW]: "Low",
  [EpicPriority.LOWEST]: "Lowest"
};
