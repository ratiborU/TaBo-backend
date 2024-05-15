import { Router } from "express";
import TaskController from "../controllers/TaskController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const taskRouter = new Router();

taskRouter.post('', verifyToken, TaskController.create);
taskRouter.get('', verifyToken, TaskController.getAll);
taskRouter.get('/:id', verifyToken, TaskController.getOne);
taskRouter.put('/', verifyToken, TaskController.update);
taskRouter.delete('/:id', verifyToken, TaskController.delete);

export default taskRouter;