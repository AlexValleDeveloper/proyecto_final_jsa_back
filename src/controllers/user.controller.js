// ===== DEPENDENCIAS =====
// const bcrypt = require("bcrypt") // Para encriptar y comparar contraseñas
// const userModel = require("../models/user.model") // Funciones que ejecutan los SQL
// const { createToken } = require("../utils/jwt") // Para generar el token JWT

// ===== REGISTER =====
// Recibe name, email y password por el body
// Comprueba que el email no existe, encripta la contraseña e inserta el usuario
// const register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body

//         // Busca si el email ya existe en la BD
//         const selectedUser = await userModel.selectByEmail(email)
//         if (selectedUser) {
//             return res.status(400).json({ msj: "El email ya está registrado" })
//         }

//         // Encripta la contraseña antes de guardarla (10 = nivel de seguridad)
//         const passHashed = bcrypt.hashSync(password, 10)

//         // Inserta el nuevo usuario en la BD
//         const result = await userModel.addUser(name, passHashed, email)
//         if (result.insertId) {
//             return res.status(201).json({ id: result.insertId, msj: "Insertado con éxito" })
//         }
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }

// ===== LOGIN =====
// Recibe email y password por el body
// Comprueba que el email existe y que la contraseña es correcta
// Si todo ok, devuelve un token JWT
// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body

//         // 1.- Busca el usuario por email en la BD
//         const selectedUser = await userModel.selectByEmail(email)
//         if (!selectedUser) {
//             return res.status(400).json({ msj: "El email NO está registrado" })
//         }

//         // 2.- Compara la contraseña recibida con la encriptada en la BD
//         const isSame = bcrypt.compareSync(password, selectedUser[0].pass)
//         if (!isSame) {
//             return res.status(400).json({ msj: "Contraseña incorrecta" })
//         }

//         // 3.- Crea el token con los datos del usuario y lo devuelve
//         const token = createToken(selectedUser[0])
//         return res.status(200).json({ msj: "Login exitoso", token: token })
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }

// ===== GET PROFILE =====
// Ruta privada - solo accesible con token válido
// El middleware checkToken ya verificó el token y guardó los datos en req.userLogin
// const getProfile = async (req, res) => {
//     return res.status(200).json(req.userLogin)
// }

// module.exports = { register, login, getProfile }
