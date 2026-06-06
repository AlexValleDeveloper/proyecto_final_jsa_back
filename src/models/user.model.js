const pool = require("../config/connection"); // Pool de conexiones a la BD

// ¿Qué funciones nos intera crear para acceder a la Base de Datos?

// Para registrarnos tenemos primero que:
// Buscar si el email con el que el usuario se esta registrando ya existe en la BD.
// No podemos guardar en la BD dos email iguales. Tenemos que hacer esa validación.
// Para el bootcamp usaremos una función reutilizable, que nos sirva para el register y el login.
const selectByEmail = async (email) => {
  const select = "SELECT id, email, role, password FROM user WHERE email = ?";
  const [result] = await pool.query(select, [email]);
  return result;
};

// ===== ADD USER =====
// Inserta un nuevo usuario en la BD.
// Devuelve el resultado de la query (result.insertId para obtener el id generado que será importante después en el controller.)
const addUser = async (userData) => {
  const insert = "INSERT INTO user (email, name, birth_date, password, validated) VALUES (?,?,?,?,?)";
  const [result] = await pool.query(insert, [
    userData.email,
    userData.name,
    userData.birthDate,
    userData.password,
    userData.validated,
  ]);
  return result;
};

module.exports = { addUser, selectByEmail };
