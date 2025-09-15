import express from "express"
const router = express.Router();
import  { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';
import verifyCredentials from '../middlewares/auth.middleware.js';

router.post('/', verifyCredentials, createTask);
router.get('/', verifyCredentials, getTasks);
router.put('/:id', verifyCredentials, updateTask);
router.delete('/:id', verifyCredentials, deleteTask);

export default router;