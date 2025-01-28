export type TaskStatus = "할 일" | "진행 중" | "완료" | "보류" | "취소"

export interface SubTask {
  id: string
  content: string
  status: TaskStatus
  startTime?: Date
  endTime?: Date
}

export interface Task {
  id: string
  content: string
  status: TaskStatus
  subTasks: SubTask[]
  startTime?: Date
  endTime?: Date
}

export interface Project {
  id: string
  name: string
  tasks: Task[]
}

