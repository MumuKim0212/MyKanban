import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import type { Project } from "../types"

const MainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "서버 프로젝트", tasks: [] },
    { id: "2", name: "운영툴 프로젝트", tasks: [] },
  ])

  const [newProjectName, setNewProjectName] = useState("")

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: (projects.length + 1).toString(),
        name: newProjectName.trim(),
        tasks: [],
      }
      setProjects([...projects, newProject])
      setNewProjectName("")
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>프로젝트 목록</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/board/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="새 프로젝트 이름"
        />
        <button onClick={handleCreateProject}>새 프로젝트 만들기</button>
      </div>
    </div>
  )
}

export default MainPage

