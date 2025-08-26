import { Op } from "sequelize";
import Task from "../model/Task.js";

export async function getAllTasks() {
  return await Task.findAll();
}

export async function createTask(data) {
  return await Task.create(data);
}

export async function deleteTask(id) {
  return await Task.destroy({ where: { id } });
}

export async function findTasks(query) {
  return await Task.findAll({
    where: {
      title: {
        [Op.like]: `%${query}%` 
      }
    }
  });
}

export async function findTaskById(id) {
  return await Task.findByPk(id);
}