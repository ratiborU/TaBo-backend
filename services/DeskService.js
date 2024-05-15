import Desk from "../models/Desk.js";
import UserService from "./UserService.js";
import ColumnService from "./ColumnService.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import { ObjectId } from "mongodb";

class DeskService {
  async create(desk) {
    const user = await UserService.getOne(desk.users[0]);
    const position = await this.getUserDesks(user._id);
    desk.position = position.length;
    const createdDesk = await Desk.create(desk);
    user.desks = [...user.desks, createdDesk._id];
    await UserService.update(user);
    return createdDesk;
  }

  async getAll() {
    const desks = await Desk.find();
    return desks;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const desk = await Desk.findById(id);
    return desk;
  }

  // какой-то ужас лучше переделать, но не факт что нужно
  async getFull(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const desk = await Desk.findById(id);
    const columns = await Column.find({deskId: id});
    for (const column of columns) {
      const tasks = await Task.find({columnId: column._id});
      for (const task of tasks) {
        const comments = await Comment.find({taskId: task._id});
        task._doc.comments = comments;
      }
      column._doc.tasks = tasks;
    }
    desk._doc.columns = columns;
    return desk;
  }

  async getUserDesks(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const user = await User.findById(id)
    const desksIds = user.desks;
    const desks = []
    for (const deskId of desksIds) {
      let desk = await this.getOne(deskId);
      desks.push(desk);
    }
    return desks;
  }

  async update(desk) {
    if (!desk._id) {
      throw new Error('id desk не указан');
    }
    const updatedDesk = await Desk.findByIdAndUpdate(desk._id, desk, {new: true});
    return updatedDesk; 
  }

  async updateAllPositions(id, desk) { 
    if (!desk._id) {
      throw new Error('id desk не указан');
    }

    const desks = (await this.getUserDesks(id)).sort((a, b) => a.position - b.position); // какой-то треш но это работает хорошо
    const currentDesk = await this.getOne(desk._id);
    if (desk.position === currentDesk.position) {
      return desk;
    }
    const moveDirection = desk.position > currentDesk.position ? 1 : -1; 

    for (let i = currentDesk.position; i != desk.position; i += moveDirection) {
      desks[i + moveDirection].position -= moveDirection;
      await Desk.findByIdAndUpdate(desks[i + moveDirection]._id, desks[i + moveDirection], {new: true})
    }

    const updatedDesk = await Desk.findByIdAndUpdate(desk._id, desk, {new: true});
    return updatedDesk; 
  }

  async addUser(userId, deskId) {
    if (!userId || !deskId) {
      throw new Error('id не указан');
    }
    
    const desk = await this.getOne(deskId);
    desk.users = [...desk.users, userId];
    await this.update(desk);

    const user = await UserService.getOne(userId);
    user.desks = [...user.desks, deskId];
    await UserService.update(user);

    return desk; 
  }

  async deleteUser(userId, deskId) {
    if (!userId || !deskId) {
      throw new Error('id не указан');
    }
    
    const desk = await this.getOne(deskId);
    desk.users = desk.users.filter(x => x !== userId); //
    await this.update(desk);

    const user = await UserService.getOne(userId);
    user.desks = user.desks.filter(x => x !== deskId); //
    await UserService.update(user);

    return desk; 
  }

  async delete(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const desk = await Desk.findByIdAndDelete(id);

    const columns = await Column.find({ deskId: id })
    columns.forEach(async x => await ColumnService.delete(x._id));
    
    desk.users.forEach(async userId => {
      const user = await UserService.getOne(userId);
      user.desks = user.desks.filter(x => !x.equals(desk._id));
      await UserService.update(user);
    });

    return desk;
  }
}


export default new DeskService;