//Express maneja rutas y apis con get post put y delete
import express from "express";
import roleController from "../controllers/roleController.js"

const router = express.Router();

//vamos a registrar
//http://localhost:3001/api/role/registerRole
router.post("/registerRole", roleController.registerRole);

//Traigo el listado de los registros
router.get("/listRole", roleController.listRole);

export default router;