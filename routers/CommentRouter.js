import { Router } from "express";
import CommentController from "../controllers/CommentController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const commentRouter = new Router();

commentRouter.post('', verifyToken, CommentController.create);
commentRouter.get('', verifyToken, CommentController.getAll);
commentRouter.get('/:id', verifyToken, CommentController.getOne);
commentRouter.put('/', verifyToken, CommentController.update);
commentRouter.delete('/:id', verifyToken, CommentController.delete);

export default commentRouter;