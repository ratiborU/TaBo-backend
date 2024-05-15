import Comment from "../models/Comment.js";
import CommentService from "../services/CommentService.js";


class CommentController {
  async create(req, res) {
    try {
      const comment = await CommentService.create(req.body);
      res.status(200).json(comment);
    } catch(e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const comments = await CommentService.getAll();
      return res.json(comments);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const comment = await CommentService.getOne(req.params.id);
      return res.json(comment);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedComment = await CommentService.update(req.body);
      return res.json(updatedComment); 
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const comment = await CommentService.delete(req.params.id);
      return res.json(comment);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}


export default new CommentController();