const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/to-do-list");

const taskRoutes = require("./routes/task.routes");
app.use(cors());
app.use(taskRoutes);
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
