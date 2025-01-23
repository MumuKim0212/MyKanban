import type React from "react"
import { useState } from "react"
import type { Task, TaskStatus } from "../types"

interface TaskCardProps {
  task: Task
  updateStatus: (newStatus: TaskStatus) => void
  addSubTask: (content: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, updateStatus, addSubTask }) => {
  const [newSubTaskContent, setNewSubTaskContent] = useState("")

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStatus(e.target.value as TaskStatus)
  }

  const handleAddSubTask = () => {
    if (newSubTaskContent.trim()) {
      addSubTask(newSubTaskContent.trim())
      setNewSubTaskContent("")
    }
  }

  const calculateProgress = () => {
    if (task.subTasks.length === 0) return 0
    const completedTasks = task.subTasks.filter((subTask) => subTask.status === "완료").length
    return (completedTasks / task.subTasks.length) * 100
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "3px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      }}
    >
      <h3>{task.content}</h3>
      <select value={task.status} onChange={handleStatusChange}>
        <option value="할 일">할 일</option>
        <option value="진행 중">진행 중</option>
        <option value="완료">완료</option>
        <option value="보류">보류</option>
        <option value="취소">취소</option>
      </select>
      <div>진행도: {calculateProgress().toFixed(2)}%</div>
      <div>시작: {task.startTime?.toLocaleString()}</div>
      <div>종료: {task.endTime?.toLocaleString()}</div>
      <h4>서브 태스크</h4>
      <ul>
        {task.subTasks.map((subTask) => (
          <li key={subTask.id}>
            {subTask.content} - {subTask.status}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newSubTaskContent}
        onChange={(e) => setNewSubTaskContent(e.target.value)}
        placeholder="새 서브 태스크"
      />
      <button onClick={handleAddSubTask}>추가</button>
    </div>
  )
}

export default TaskCard