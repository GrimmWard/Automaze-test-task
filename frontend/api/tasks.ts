import { TaskType } from "@/types";
import api from "./config";

export const getAllTasks = async ():Promise<TaskType[]> => {
  try {
    const res = await api.get("/tasks");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};

export const addTask = async (task: { title: string; priority: number }) => {
  try {
    const res = await api.post("/tasks/create", task);
    return res.data;
  } catch (error) {
    throw new Error("Failed to add task");
  }
};

export const updateTask = async (id: string, done: boolean) => {
  try {
    const res = await api.patch(`/tasks/update/${id}`, { done });
    return res.data;
  } catch (error) {
    throw new Error("Failed to update task");
  }
}


export const deleteTask = async (id: string) => {
  try {
    const res = await api.delete(`/tasks/delete/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete task");
  }
}
