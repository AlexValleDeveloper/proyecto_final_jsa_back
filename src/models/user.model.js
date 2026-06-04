//const pool = require("../config/connection"); // Pool de conexiones a la BD

// ===== SELECT BY EMAIL =====
// Busca un usuario por email en la BD
// Devuelve el array con el usuario si existe, false si no
// const selectByEmail = async (email) => {
//     const sql = "SELECT id, email, role, pass FROM users WHERE email = ?"
//     const [result] = await pool.query(sql, [email])
//     if (result.length > 0) {
//         return result
//     }
//     return false
// }

// ===== ADD USER =====
// Inserta un nuevo usuario en la BD
// Devuelve el resultado de la query (result.insertId para obtener el id generado que será importante después en el controller.)
// const addUser = async (name, pass, email) => {
//     const insert = "INSERT INTO users (email, pass, name, role) VALUES (?,?,?,?)"
//     const [result] = await pool.query(insert, [email, pass, name, "user"])
//     return result
// }

// module.exports = { selectByEmail, addUser }
