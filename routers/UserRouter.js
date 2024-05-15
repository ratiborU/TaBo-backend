import { Router } from "express";
import UserController from "../controllers/UserController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const userRouter = new Router();

userRouter.post('', verifyToken, UserController.create);
userRouter.get('', verifyToken, UserController.getAll);
userRouter.get('/:id', verifyToken, UserController.getOne);
userRouter.put('/', verifyToken, UserController.update);
userRouter.delete('/:id', verifyToken, UserController.delete);

export default userRouter;