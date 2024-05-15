import Desk from "../models/Desk.js";
import DeskService from "../services/DeskService.js";


class DeskController {
  async create(req, res) {
    try {
      const desk = await DeskService.create(req.body);
      res.status(200).json(desk);
    } catch(e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const desks = await DeskService.getAll();
      return res.json(desks);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const desk = await DeskService.getOne(req.params.id);
      return res.json(desk);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getFull(req, res) {
    try {
      const desk = await DeskService.getFull(req.params.id);
      return res.json(desk);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getUserDesks(req, res) {
    try {
      const desks = await DeskService.getUserDesks(req.params.id);
      return res.json(desks);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedDesk = await DeskService.update(req.body);
      return res.json(updatedDesk); 
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateAllPositions(req, res) {
    try {
      const updatedDesk = await DeskService.updateAllPositions(req.params.id, req.body);
      return res.json(updatedDesk); 
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async addUser(req, res) {
    try {
      const updatedDesk = await DeskService.addUser(req.body.userId, req.body.deskId);
      return res.json(updatedDesk); 
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const updatedDesk = await DeskService.deleteUser(req.body.userId, req.body.deskId);
      return res.json(updatedDesk); 
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const desk = await DeskService.delete(req.params.id);
      return res.json(desk);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}


export default new DeskController();