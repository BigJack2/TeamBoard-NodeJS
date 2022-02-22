//Este archivo se encarga solo de administrar la coneccion con la bd con nodejs
//Este archivo se va a convertir en un modulo que todos van a utilizar
//importamos la libreria mongoose que nos administra la bd
import mongoose from "mongoose";

const dbconnection = async () => {

  //el trycatch se usa para mostrar errores p excepciones que no conocemos o no sabemos que va a devolver

  //en try tratamos de conectar la bd por medio de mongoose
  try {
    //process sirve para leer cualquier archivo que empiece con punto
    await mongoose.connect(process.env.DB_CONNECTION, {
      //Ayuda a no mostrar la coneccion en consola
      useNewUrlParser: true,
      //Ayuda a entender mas lo que sale en consola
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: OK");
  } catch (error) {
    console.log("Error connecting to MongoDB: \n ", error);
  }
};


//vamos a exportar esta funcion  dbconnection para que los demas archivos la puedan usar
export default { dbconnection };