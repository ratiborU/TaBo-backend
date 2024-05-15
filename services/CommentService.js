import Comment from "../models/Comment.js";
// import FileService from "./FileService.js";

class CommentService {
  async create(comment) {
    const createdComment = await Comment.create(comment);
    return createdComment;
  }

  async getAll() {
    const comments = await Comment.find();
    return comments;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const comment = await Comment.findById(id);
    return comment;
  }

  async update(comment) {
    if (!comment._id) {
      throw new Error('id Comment не указан');
    }
    const updatedComment = await Comment.findByIdAndUpdate(comment._id, comment, {new: true});
    return updatedComment; 
  }

  async delete(id) {
    if (!id) {
      throw new Error('id не указан');
    }
    const comment = await Comment.findByIdAndDelete(id);
    return comment;
  }
}


export default new CommentService;