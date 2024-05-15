import Column from "../models/Column.js";
import ColumnService from "../services/ColumnService.js";


class ColumnController {
  async create(req, res) {
    try {
      const column = await ColumnService.create(req.body);
      res.status(200).json(column);
    } catch(e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const columns = await ColumnService.getAll();
      return res.json(columns);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const column = await ColumnService.getOne(req.params.id);
      return res.json(column);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedColumn = await ColumnService.update(req.body);
      return res.json(updatedColumn); 
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  // async updateAllPositions(req, res) {
  //   try {
  //     const updatedColumn = await ColumnService.updateAllPositions(req.body);
  //     return res.json(updatedColumn); 
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // }

  async delete(req, res) {
    try {
      const column = await ColumnService.delete(req.params.id);
      return res.json(column);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}


export default new ColumnController();