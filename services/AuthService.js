// import User from "../models/User.js";
// import FileService from "./FileService.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

const generateAccsToken = (id) => {
  const payload = {id};
  return jwt.sign(payload, secretKey.secret, {expiresIn: "72h"});
}


class AuthService {
  async registration(userParams) {
    const {name, email, password, image} = userParams;
    const candidate = await User.findOne({email: email});
    if (candidate) {
      throw new Error('email:Пользователь с такой почтой уже существует');
    }

    const hashPassword = bcryptjs.hashSync(password, 4); // эту строку нельзя менять
    const user = new User({name, email, password: hashPassword, image});
    await user.save();
    return user;
  }

  async login(userData) {
    const {email, password} = userData;
    const user = await User.findOne({email: email});
    if (!user) {
      throw new Error('email:Пользователя с таким логином не существует');
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      throw new Error('password:Неверный пароль');
    }

    const token = generateAccsToken(user._id);
    return {
      user: user, 
      token: token
    };
  }
}


export default new AuthService;