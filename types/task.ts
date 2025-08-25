export type TaskColor = "red" | "blue" | "green" | "yellow" | "purple";
export interface Task {
  id: number;
  title: string;
  color: TaskColor;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface CreateTaskDTO {
  title: string;
  color: TaskColor;
}
export interface UpdateTaskDTO {
  title?: string;
  color?: TaskColor;
  completed?: boolean;
}
