import user from "../models/user.js";
//libreria para encriptar contraseña
import bcrypt from "bcrypt";
//cuando se registre un usuario se genera un token para proteger la sesion
//el token esta activo para validar que el usuario esta loguerado mientras dure la sesion
import jwt from "jsonwebtoken";
//libreria para sacar la fecha en x formato
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password) return res.status(400).send({ message: "Incomplete data" });


  //a continuacion encriptamos la contraseña
  const passHash = await bcrypt.hash(req.body.password, 10);


  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    //especificamos que es solo el id de roleId ya que es un json entero con otras propiedades
    //este role vine del middleware
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userSchema.save();

  if (!result) return res.status(500).send({ message: "Failed to register user" });

  //generamos un json web token
  try {
    //no usamos env si no json por que vamos a enviar un jsonwebtoken
    //sign genera como una forma electrocica para formar el token
    return res.status(200).json({
      token: jwt.sign({
        _id: result._id,
        name: result.name,
        role: result.role,
        //iat es un formato de fecha en que se forma el json se genera con moment
        iat: moment().unix()
        //process.env.SK_JWT es una palabra secreta que añadimos al jsonwebtoken desde el .env
      }, process.env.SK_JWT),
    });
  } catch (error) {
    return res.status(500).send({ message: "register error" });
  }
};

//funcion para listar usuarios del admin
//asi el req no se use se debe poner por estructura
//No tiene filtro de busqueda
const listUserAdmin = async (req, res) => {
  //populate es para que me traiga todo asociado al id de role

  //RegExp es una expresion regular para validar que el campo que se trae es texto con un parametro que pasamos en este caso lo que tenga name
  let users = await user.find({ name: new RegExp(req.params["name"]) }).populate("role").exec();

  //si el tamaño de items del array es cero entonces no hay nada
  if (users.length === 0) return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ users });
};

//Lista de usuario comun
//Se listan solo los que tentan dbStatus en true
const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: true }]
    })
    .populate("role")
    .exec();


  if (users.length === 0) return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ users });
};


//Login
const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });

  //validar si no hay correo
  if (!userLogin) return res.status(400).send({ message: "Wrong email or password" });

  //validar el status del usuario
  if (!userLogin.dbStatus) return res.status(400).send({ message: "Wrong email or password" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);

  //Si la contraseña comparada no es igual entonces es incorrecta
  if (!passHash) return res.status(400).send({ message: "Password not found" });

  try {
    return res.status(200).json({
      token: jwt.sign({
        _id: userLogin._id,
        name: userLogin.name,
        role: userLogin.role,
        iat: moment().unix()
      }, process.env.SK_JWT),
    });
  } catch (error) {
    return res.status(500).send({ message: "Login error" });
  }
};


//delete que en realidad solo edita el status a false
const deleteUser = async (req, res) => {
  if (!req.params["_id"]) return res.status(400).send({ message: "Imcomplete data" });

  const users = await user.findByIdAndUpdate(req.params["_id"], { dbStatus: false });

  //con operador ternario en vez de un if
  return !users
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User delete" });
};


const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Imcomplete data" });

  let pass = "";

  //Si el password llego vacio busque el usuario con el email para traer el password del usuario
  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });

    pass = findUser.password;
  } else {
    //si si llego contraseña primero hay que encryptarla
    pass = await bcrypt.hash(req.body.password, 10)
  }

  //Si no hay problema pasamos a realizar la actualizacion
  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role
  });

  if (!editUser) return res.status(500).send({ message: "Error editing user" });
  return res.status(200).send({ message: "User updated" });
};


export default { registerUser, listUser, login, deleteUser, updateUserAdmin };