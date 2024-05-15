import { Schema, model } from "mongoose";


const Desk = new Schema({
  name: {type: String, required: true},
  users: {type: Array, required: true},
  position: {type: Number, required: true}
});


export default model('Desk', Desk);