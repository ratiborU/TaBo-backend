import Column from "../models/Column.js";
// import FileService from "./FileService.js";
import Task from "../models/Task.js";
import TaskService from "./TaskService.js";
import DeskService from "./DeskService.js";

class ColumnService {
  async create(column) {
    const columns = await Column.find({deskId: column.deskId});
    column.position = columns.length;
    const createdColumn = await Column.create(column);
    return createdColumn;
  }

  async getAll() {
    const columns = await Column.find();
    return columns;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const column = await Column.findById(id);
    return column;
  }

  async update(column) {
    if (!column._id) {
      throw new Error('id Column не указан');
    }
    const currentColumn = await this.getOne(column._id);
    if (column.position === currentColumn.position) {
      const updatedColumn = await Column.findByIdAndUpdate(column._id, column, {new: true});
      return updatedColumn; 
    }
    
    const columns = (await Column.find({deskId: column.deskId})).sort((a, b) => a.position - b.position);
    const moveDirection = column.position > currentColumn.position ? 1 : -1; 

    for (let i = currentColumn.position; i != column.position; i += moveDirection) {
      columns[i + moveDirection].position -= moveDirection;
      await Column.findByIdAndUpdate(columns[i + moveDirection]._id, columns[i + moveDirection], {new: true})
    }
    
    const updatedColumn = await Column.findByIdAndUpdate(column._id, column, {new: true});
    return updatedColumn; 
  }

  // async updateAllPositions(column) {
  //   if (!column._id) {
  //     throw new Error('id Column не указан');
  //   }
  //   const columns = (await Column.find({deskId: column.deskId})).sort((a, b) => a.position - b.position);
  //   const currentColumn = await this.getOne(column._id);
  //   if (column.position === currentColumn.position) {
  //     return column;
  //   }
  //   const moveDirection = column.position > currentColumn.position ? 1 : -1; 

  //   for (let i = currentColumn.position; i != column.position; i += moveDirection) {
  //     columns[i + moveDirection].position -= moveDirection;
  //     await Column.findByIdAndUpdate(columns[i + moveDirection]._id, columns[i + moveDirection], {new: true})
  //   }
    
  //   const updatedColumn = await Column.findByIdAndUpdate(column._id, column, {new: true});
  //   return updatedColumn; 
  // }

  async delete(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const column = await Column.findByIdAndDelete(id);
    const tasks = await Task.find({columnId: id});
    tasks.forEach(async task => await TaskService.delete(task._id));
    return column;
  }
}


export default new ColumnService;