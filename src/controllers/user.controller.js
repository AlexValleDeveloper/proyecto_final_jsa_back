// ===== DEPENDENCIAS =====
const bcrypt = require("bcrypt"); // Para encriptar y comparar contraseñas
const userModel = require("../models/user.model"); // Funciones que ejecutan los SQL
const { createToken } = require("../utils/jwt"); // Para generar el token JWT

// ===== AUTH =====
// register, login

// REGISTER
// Recibe (email, name, birth_date, password) por el body.
// Comprueba que el email no existe, encripta la contraseña e inserta el usuario
const register = async (req, res) => {
  try {
    const { name, email, birthDate, password } = req.body;

    // Busca si el email ya existe en la BD
    const selectedUser = await userModel.selectByEmail(email);
    if (selectedUser.length > 0) {
      return res.status(409).json({ msj: "El email ya está registrado" });
    }

    // Encripta la contraseña antes de guardarla (10 = nivel de seguridad (es el estandar))
    const passwordHashed = bcrypt.hashSync(password, 10);

    // Monto el objeto con los datos listos para insertar:
    // password ya hasheada y validated a 0 (el admin lo aprobará después).
    const userData = { name, email, birthDate, password: passwordHashed, validated: 0 };

    // Inserta el nuevo usuario en la BD
    const result = await userModel.addUser(userData);
    if (result.insertId) {
      return res.status(201).json({ id: result.insertId, msj: "Insertado con éxito" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

// LOGIN
// Recibe email y password por el body
// Comprueba que el email existe y que la contraseña es correcta
// Si todo ok, devuelve un token JWT
const login = async (req, res) => {
  try {
    //1.- Destructuring del body de la petición.
    const { email, password } = req.body;

    //2.- Busca el usuario por email en la BD
    const selectedUser = await userModel.selectByEmail(email);
    //3.- si no existe -> 401
    if (selectedUser.length === 0) {
      return res.status(401).json({ msj: "Las credenciales no son correctas" });
    }

    //4.- Compara la contraseña recibida con la encriptada en la BD
    const isValid = bcrypt.compareSync(password, selectedUser[0].password);
    //5.- Si no coincide → 401 genérico (mismo mensaje)
    if (!isValid) {
      return res.status(401).json({ msj: "Las credenciales no son correctas" });
    }

    //6.- Crea el token con los datos del usuario que necesitamos.
    const token = createToken({ id: selectedUser[0].id, role: selectedUser[0].role });
    //7.- Responder 200 con el token
    return res.status(200).json({ msj: "Login exitoso", token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

// ==== USER Y ADMIN ====
// ===== PROFILE (usuario sobre sí mismo) =====
// GET PROFILE (getMe), UPDATE PROFILE (updateMe), DELETE PROFILE (deasctivateMe)
// Ruta privada - solo accesible con token válido
// El middleware checkToken ya verificó el token y guardó los datos en req.userLogin
const getMe = async (req, res) => {
  try {
    //1. Saco el id del req.userLogin que viene de checkToken (auth.js) e identifico al usuario
    const id = req.userLogin.id;
    //2. Le pasamos el id al model
    const selectedUser = await userModel.selectById(id);
    if (selectedUser.length === 0) {
      return res.status(404).json({ msj: "Usuario no encontrado" });
    }
    const userData = selectedUser[0];
    return res.status(200).json({ msj: "Este es tu perfil", user: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

const updateMe = async (req, res) => {
  try {
    // 1. Saco el id del token
    const id = req.userLogin.id;
    // 2. Recojo los campos a actualizar del body
    const userData = req.body;
    // 3. Llamo al model con el id y los datos
    const selectedUser = await userModel.updateMe(id, userData);
    // 4. Si no se actualizó nada (no llegaron campos válidos) -> 400
    if (!selectedUser) {
      return res.status(400).json({ msj: "No llegaron campos válidos" });
    }
    // 5. Si no encontró al usuario (affectedRows = 0) -> 404
    if (selectedUser.affectedRows === 0) {
      return res.status(404).json({ msj: "No se ha podido encontrar al usuario" });
    }
    // 6. Responder 200
    return res.status(200).json({ msj: "Su perfil ha sido actualizado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

const deactivateMe = async (req, res) => {
  try {
    // 1. Saco el id del token para pasarselo como argumento a la función del model.
    const id = req.userLogin.id;
    // 2. Compruebo si tiene pedidos activos
    const activeOrders = await userModel.hasActiveOrders(id);
    if (activeOrders.length > 0) {
      return res.status(409).json({ msj: "No puedes darte de baja con pedidos en curso" });
    }
    // 3. LLamo al model y le doy el id
    const selectedUser = await userModel.deactivateUser(id);
    // 4. Si no encontró al usuario (affectedRows = 0) -> 404
    if (selectedUser.affectedRows === 0) {
      return res.status(404).json({ msj: "No se ha podido encontrar al usuario" });
    }
    // 5. Responder 200
    return res.status(200).json({ msj: "Su perfil ha sido eliminado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

// ===== ADMIN =====
// getUsers, validateUser
const getUsers = async (req, res) => {
  try {
    // 1. Recojo el filtro opcional del query param
    const validated = req.query.validated;
    // 2. Llamo al model pasándole el filtro (puede ser undefined)
    const users = await userModel.getUsers(validated);
    // 3. Responder 200 con el listado
    return res.status(200).json({ msj: "Aquí tienes los usuarios", users: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

const validateOneUser = async (req, res) => {
  try {
    //1. Recojo el id del usuario que viene por req.params
    const { id } = req.params;
    // 2. Llamo al model pasándole el id.
    const user = await userModel.validateUser(id);
    // 3. Si no encontró al usuario (affectedRows = 0) → 404
    if (user.affectedRows === 0) {
      return res.status(404).json({ msj: "No se ha podido encontrar al usuario" });
    }
    // 3. Responder 200
    return res.status(200).json({ msj: "El usuario ha sido validado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

module.exports = { register, login, getMe, updateMe, deactivateMe, getUsers, validateOneUser };
