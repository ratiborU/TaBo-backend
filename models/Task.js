import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";


const Task = new Schema({
  name: {type: String, required: true},
  columnId: {type: ObjectId, ref: 'Column', required: true},
  description: {type: String},
  users: {type: Array},
  result: {type: String},
  files: {type: Array},
  deadline: {type: Date},
  position: {type: Number, required: true}
});


export default model('Task', Task);