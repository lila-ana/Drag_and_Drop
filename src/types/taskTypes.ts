export type TaskParams = {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
  createdDate: Date;
  assignee?: string[];
  tags?: string[];
  subtasks?: TaskParams[];
  comments?: string[];
};
export type UpdateTaskParams = {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
  createdDate: Date;
  updatedDate: Date;
  assignee?: string[];
  tags?: string[];
  subtasks?: UpdateTaskParams[];
  comments?: string[];
};
