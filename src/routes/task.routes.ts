import {Router} from "express";
import {createTask, deleteTask, readTasks, toggleTask, updateTask} from "../controllers/task.controller";

const router = Router();

router.get("/", readTasks);
router.post("/", createTask);
router.put("/:taskId", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

export default router;

// TODO: Implement the following endpoints:
// - GET /api/v1/tasks/:id - Get a task by ID
// - POST /api/v1/tasks/ - Create a new task
// - PUT /api/v1/ta:wa
// sks/:id - Update a task by ID
// - DELETE /api/v1/tasks/:id - Delete a task by ID