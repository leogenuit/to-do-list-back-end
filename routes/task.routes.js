const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const task = new Task({
      name: req.body.name,
    });
    await task.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.status(201).json({ message: "Task created" });
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.name = req.body.name;
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    if (req.params.id) {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "task deleted" });
    } else {
      res.status(400).json({ message: "missing id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
