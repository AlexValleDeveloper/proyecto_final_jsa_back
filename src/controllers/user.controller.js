// ===== DEPENDENCIAS =====
const bcrypt = require("bcrypt"); // Para encriptar y comparar contraseñas
const userModel = require("../models/user.model"); // Funciones que ejecutan los SQL
const { createToken } = require("../utils/jwt"); // Para generar el token JWT

// ===== REGISTER =====
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

// ===== LOGIN =====
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
    console.log(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

// ===== GET PROFILE =====
// Ruta privada - solo accesible con token válido
// El middleware checkToken ya verificó el token y guardó los datos en req.userLogin
// const getProfile = async (req, res) => {
//     return res.status(200).json(req.userLogin)
// }

module.exports = { register, login };
