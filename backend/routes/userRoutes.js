//Express maneja rutas y apis con get post put y delete
import express from "express";
import userController from "../controllers/userController.js"
import userValidate from "../middleware/userValidate.js";
import roleValidate from "../middleware/roleValidate.js";

//por lo visto se usa el mismo
const router = express.Router();


//Se usa asi en caso de que se deban poner varias validaciones en el https
const existingUser = userValidate.existingUser;

const existingRole = roleValidate.existingRole;

//vamos a registrar
//http://localhost:3001/api/user/registerUser
router.post("/registerUser", existingUser, existingRole, userController.registerUser);


//Traigo el listado de los registros
//los parametros del controller se traen  en la url con "/:name?"
router.get("/listUser/:name?", userController.listUser);
//necesitamos enviar un json en post para comparar email y password
router.post("/login", userController.login);

//put cuando se edita solo el status y aparenta borrarlo
router.put("/delete/:_id", userController.deleteUser);

//actualizamos demas datos del usuario
router.put("/updateUserAdmin", userController.updateUserAdmin);


export default router;