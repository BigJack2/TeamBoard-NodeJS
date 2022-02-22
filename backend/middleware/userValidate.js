import user from "../models/user.js";

//contiene rquest, response y next para indicar que puede continuar
const existingUser = async (req, res, next) => {

  if (!req.body.email) return res.status(400).send({ message: "Incomplete data" });

  //findone es encontrar la primera coincidencia que encuentre para no repetir usuario en este caso por correo, si me encuentra uno que tenga el mismo email es que ya esta registrado
  //en el campo email busque si encuentra uno
  const existingEmail = await user.findOne({ email: req.body.email });
  if (existingEmail) return res.status(400).send({ message: "The user is already registered" });

  next();
};

export default { existingUser };