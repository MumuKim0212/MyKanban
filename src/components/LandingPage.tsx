import type React from "react"
import { Link } from "react-router-dom"

const LandingPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "2rem",
        cursor: "pointer",
      }}
    >
      <Link to="/main" style={{ textDecoration: "none", color: "inherit" }}>
        Hello
      </Link>
    </div>
  )
}

export default LandingPage

