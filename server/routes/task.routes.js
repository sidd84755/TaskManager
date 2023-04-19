import express from "express";

import { getAllTasks,
    getTaskDetail,
    createTask,
    updateTask,
    deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.route('/').get(getAllTasks);
router.route('/:id').get(getTaskDetail);
router.route('/').post(createTask);
router.route('/:id').patch(updateTask);
router.route('/:id').delete(deleteTask);

export default router;