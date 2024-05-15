import { validationResult } from "express-validator";
import AuthService from "../services/AuthService.js";


class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибка при регистрации", errors});
      }
      
      const user = await AuthService.registration(req.body);
      res.status(200).json(user);
    } catch(e) {
      res.status(500).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const token = await AuthService.login(req.body);
      return res.json({token});
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}


export default new AuthController();