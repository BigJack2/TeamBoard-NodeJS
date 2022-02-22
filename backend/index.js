//Importamos la libreria del servidor
import express from "express";

//se encarga de la seguridad de las conecciones de protocolos http
import cors from "cors";

//importamos la coneccion
import db from "./db/db.js";

//
import roleRoutes from "./routes/roleRoutes.js"

import userRoutes from "./routes/userRoutes.js"

import taskRoutes from "./routes/taskRoutes.js"

//Libreria que se encarga de drcirle al proyecto que trabaja con variables de entorno
import dotenv from "dotenv";

//ejecuta la libreria para que todo el proyecto use dotenv
dotenv.config();

// express con parentesis por que vamos a usar todo
const app = express();


//el servidor solo va a trabajar con json, primera regla
app.use(express.json());
//usare todo lo de cors
app.use(cors());
//uso del route role
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);


//que el sistema "escuche" ponga atencion para saber en que puerto vamos a trabajar
app.listen(process.env.PORT, () => console.log("Backend Server running on Port:", process.env.PORT));


//llamamos la funcion de conecion de db.js en la carpeta db
db.dbconnection();