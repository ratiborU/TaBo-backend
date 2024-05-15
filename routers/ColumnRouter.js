import { Router } from "express";
import ColumnController from "../controllers/ColumnController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const columnRouter = new Router();

columnRouter.post('', verifyToken, ColumnController.create);
columnRouter.get('', verifyToken, ColumnController.getAll);
columnRouter.get('/:id', verifyToken, ColumnController.getOne);
columnRouter.put('/', verifyToken, ColumnController.update);
// columnRouter.put('/update-all-positions/', verifyToken, ColumnController.update);
columnRouter.delete('/:id', verifyToken, ColumnController.delete);

export default columnRouter;