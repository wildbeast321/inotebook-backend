const connecttomongo = require("./db")
const express = require('express')
connecttomongo();
const app = express()
const port = 5000
var cors= require("cors")
app.use(cors())
app.use(express.json())

//Available Routes
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))


app.listen(port, () => {
  console.log(`iNotebook- Backend listening on port http://localhost:${port}`)
})