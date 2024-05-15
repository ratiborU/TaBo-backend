import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";


const Column = new Schema({
  name: {type: String, required: true},
  deskId: {type: ObjectId, ref: 'Desk', required: true},
  position: {type: Number, required: true}
});


export default model('Column', Column);