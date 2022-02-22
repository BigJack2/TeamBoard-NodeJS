import mongoose from "mongoose";

//Estructura de una coleccion de base de datos en esquema Json
const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  //Tipo de dato fecha y por defecto la fecha del sistema
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

//es un modelo de base de datos que en mongodb se va a llamar roles
//Consulta la informacion de roleSchema para poder exportarla en la variable role
//si la colecion roles no esta, la crea en MongoDB
//Toda la informacion de roleSchema la guarda en la coleccion roles de Mongo
const role = mongoose.model("roles", roleSchema);
//se exporta para que cualuier JS use la informacion de roleSchema
export default role;