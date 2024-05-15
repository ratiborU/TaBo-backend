import express from 'express'
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

import userRouter from './routers/UserRouter.js';
import deskRouter from './routers/DeskRouter.js';
import columnRouter from './routers/ColumnRouter.js';
import taskRouter from './routers/TaskRouter.js';
import commentRouter from './routers/CommentRouter.js';
import authRouter from './routers/AuthRouter.js';
import cors from "cors";

// вынести в config
const PORT = 5000;
const DB_URL = `mongodb+srv://ustinovichratibor:3pKNjPhihr3DDnc1@tabo.bbxs8nc.mongodb.net/?retryWrites=true&w=majority&appName=TaBo`;


const app = express();
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));

app.use(cors()); // настроить для определенного сайта
app.use('/users', userRouter);
app.use('/desks', deskRouter);
app.use('/columns', columnRouter);
app.use('/tasks', taskRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);


async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}


startApp();