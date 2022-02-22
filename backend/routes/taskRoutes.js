//Express maneja rutas y apis con get post put y delete
import express from "express";
import taskController from "../controllers/taskController.js"


const router = express.Router();


router.post("/registerTask", taskController.registerTask);

router.get("/listTask", taskController.listTask);

router.put("/updateTask", taskController.updateTask);

router.delete("/deleteTask/:_id", taskController.deleteTask);

export default router;