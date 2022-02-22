import role from "../models/role.js";

const existingRole = async (req, res, next) => {

  //validar el rol en los campos que me busque el rol user para que lo asigne
  const roleId = await role.findOne({ name: "user" });

  //si no hay un rol que asignar muestre el mensaje
  if (!roleId) return res.status(500).send({ message: "No role was assigned" });

  req.body.role = roleId._id;

  next();

};

export default { existingRole };