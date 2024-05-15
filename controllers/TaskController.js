import Task from "../models/Task.js";
import TaskService from "../services/TaskService.js";


class TaskController {
  async create(req, res) {
    try {
      const task = await TaskService.create(req.body);
      res.status(200).json(task);
    } catch(e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const tasks = await TaskService.getAll();
      return res.json(tasks);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const task = await TaskService.getOne(req.params.id);
      return res.json(task);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedTask = await TaskService.update(req.body);
      return res.json(updatedTask); 
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const task = await TaskService.delete(req.params.id);
      return res.json(task);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}


export default new TaskController();