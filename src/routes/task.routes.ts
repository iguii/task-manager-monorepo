import {Router} from "express";
import {createTask, deleteTask, readTasks, toggleTask, updateTask} from "../controllers/task.controller";
import {createTag, deleteTag, readTags, updateTag} from "../controllers/tag.controller";

const router = Router();

router.get("/", readTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

export default router;