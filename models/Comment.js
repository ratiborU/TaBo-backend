import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";


const Comment = new Schema({
  user: {type: ObjectId, required: true},
  taskId: {type: ObjectId, ref: 'Task', required: true},
  content: {type: String, required: true},
  date: {type: Date, required: true},
});


export default model('Comment', Comment); 