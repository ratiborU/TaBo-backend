import Task from "../models/Task.js";
// import FileService from "./FileService.js";
import Comment from "../models/Comment.js";
import CommentService from "./CommentService.js";
import ColumnService from "./ColumnService.js";

class TaskService {
  async create(task) {
    const tasks = await Task.find({columnId: task.columnId});
    task.position = tasks.length;
    const createdTask = await Task.create(task);
    return createdTask;
  }

  async getAll() {
    const tasks = await Task.find();
    return tasks;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const task = await Task.findById(id);
    return task;
  }

  async update(task) {
    if (!task._id) {
      throw new Error('id Task не указан');
    }

    const currentTask = await this.getOne(task._id);
    if (task.position === currentTask.position && currentTask.columnId.equals(task.columnId)) {
      const updatedTask = await Task.findByIdAndUpdate(task._id, task, {new: true});
      return updatedTask; 
    }

    if (!currentTask.columnId.equals(task.columnId)) {
      const tasks = (await Task.find({columnId: task.columnId})).sort((a, b) => a.position - b.position);
      for (let i = task.position; i < tasks.length; i++) {
        tasks[i].position += 1;
        await Task.findByIdAndUpdate(tasks[i]._id, tasks[i], {new: true})
      }

      const tasksSecond = (await Task.find({columnId: currentTask.columnId})).sort((a, b) => a.position - b.position);
      for (let i = currentTask.position + 1; i < tasksSecond.length; i++) {
        tasksSecond[i].position -= 1;
        await Task.findByIdAndUpdate(tasksSecond[i]._id, tasksSecond[i], {new: true})
      }

      const updatedTask = await Task.findByIdAndUpdate(task._id, task, {new: true});
      return updatedTask; 
    }

    const tasks = (await Task.find({columnId: task.columnId})).sort((a, b) => a.position - b.position);
    const moveDirection = task.position > currentTask.position ? 1 : -1; 

    for (let i = currentTask.position; i != task.position; i += moveDirection) {
      tasks[i + moveDirection].position -= moveDirection;
      await Task.findByIdAndUpdate(tasks[i + moveDirection]._id, tasks[i + moveDirection], {new: true})
    }

    const updatedTask = await Task.findByIdAndUpdate(task._id, task, {new: true});
    return updatedTask; 
  }

  async delete(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const task = await Task.findByIdAndDelete(id);
    const comments = await Comment.find({taskId: id});
    comments.forEach(async comment => await CommentService.delete(comment._id));
    return task;
  }
}


export default new TaskService;