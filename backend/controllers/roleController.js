import role from "../models/role.js";

//controla los requerimientos y las respuestas para crear la api en Json
//request y response
//async converte la funcion en asincrona mientras otras esten ejecutando al tiempo
const registerRole = async (req, res) => {
  //si no me llegan datos del campo nombre o descripcion en el json es decir el body no ejecute nada, no procese nada.
  //400 es el rango de error de peticiones https
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Imcomplete data" });

  //creamos un nuevo esquema a partir del import role
  //estamos creando una variable que use la estructura que me trae el impor role
  //este esquema casi que copiado se crea para comunicarse mejor con mongoDB
  let schemaRole = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  //Confirmeme que va a guardar lo que esta capturado en el esquema
  //el await ayuda a que el frontend espere el resultado del backend, es una promesa
  let myResult = await schemaRole.save();
  //Si no se guardo la infor en mongo da error 500
  if (!myResult) return res.status(500).send({ message: "Fail to register role" });

  //si todo salio bien muestre el siguiente mensaje con tipo de respuesta https 200
  res.status(200).send({ myResult })
};

//funcion para listar usuarios
//asi el req no se use se debe poner por estructura
const listRole = async (req, res) => {
  //populate es para que me traiga todo asociado al id de role
  let roles = await role.find();

  //si el tamaño de items del array es cero entonces no hay nada
  if (roles.length === 0) return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ roles });
};

export default { registerRole, listRole };