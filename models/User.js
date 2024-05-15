import { Schema, model } from "mongoose";


const User = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  image: {type: String},
  desks: {type: Array}
});


export default model('User', User);