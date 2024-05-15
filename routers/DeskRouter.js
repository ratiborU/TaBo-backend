import { Router } from "express";
import DeskController from "../controllers/DeskController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const deskRouter = new Router();

deskRouter.post('', verifyToken, DeskController.create);

deskRouter.get('', verifyToken, DeskController.getAll);
deskRouter.get('/:id', verifyToken, DeskController.getOne);
deskRouter.get('/get-full/:id', verifyToken, DeskController.getFull);
deskRouter.get('/user-desks/:id', verifyToken, DeskController.getUserDesks);

deskRouter.put('/', verifyToken, DeskController.update);
deskRouter.put('/update-all-position/:id', verifyToken, DeskController.updateAllPositions); // поменять на изменение у пользователя а не у всех

deskRouter.patch('/add-user', verifyToken, DeskController.addUser);
deskRouter.patch('/delete-user', verifyToken, DeskController.deleteUser);

deskRouter.delete('/:id', verifyToken, DeskController.delete);

export default deskRouter;