import express from "express"
import cors from "cors"
import path from "path"
import boardRoutes from "./routes/board.routes"
import cardRoutes from "./routes/card.routes"
import columnRoutes from "./routes/column.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/board", boardRoutes)
app.use("/api/cards", cardRoutes)
app.use("/api/columns", columnRoutes)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../client/build")))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"))
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})