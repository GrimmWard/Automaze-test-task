import express from "express";
import {
  createTask,
  deleteTask,
  findTaskById,
  findTasks,
  getAllTasks,
} from "../services/task_service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newTask = await createTask(req.body);
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    } 
    const task = await findTaskById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.update({ done });

    res.status(200).json({ message: "Task updated successfully", task });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }
    await deleteTask(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
