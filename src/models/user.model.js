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

// ===== PROFILE (usuario sobre sí mismo) =====
const selectById = async (id) => {
  const select =
    "SELECT id, email, name, birth_date AS birthDate, role, address, phone, validated, active FROM user WHERE id = ?";
  const [result] = await pool.query(select, [id]);
  return result;
};

const updateMe = async (id, userData) => {
  // 1. Lista de campos permitidos — nunca actualizamos lo que no está aquí. Contraseña iría a parte.
  const allowedFields = ["name", "email", "birthDate", "address", "phone"];
  // Mapa de traducción camelCase (cliente) → snake_case (BD)
  const fieldMap = { name: "name", email: "email", birthDate: "birth_date", address: "address", phone: "phone" };

  // 2. Filtramos el objeto recibido — solo los campos permitidos que llegaron
  const fields = []; // acumula "name = ?", "email = ?"...
  const values = []; // acumula los valores en el mismo orden.

  // 3. Por cada campo permitido, comprobamos si llegó en userData.
  for (const field of allowedFields) {
    if (userData[field] !== undefined) {
      fields.push(`${fieldMap[field]} = ?`);
      values.push(userData[field]);
    }
  }

  // 4. Si no llegó ningún campo válido, no hacemos nada.
  if (fields.length === 0) {
    return null;
  }

  // 5. Montamos la query con los campos que llegaron
  // fields.join(", ") → "name = ?, email = ?"
  const update = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id); // el id va al final, para el where

  const [result] = await pool.query(update, values);
  return result;
};

const deactivateUser = async (id) => {
  const update = "UPDATE user SET active = 0 WHERE id = ?";
  const [result] = await pool.query(update, [id]);
  return result;
};

// ===== ADMIN =====
// getUsers, validateUser
const getUsers = async (validated) => {
  if (validated !== undefined) {
    const select = "SELECT id, email, name, role, address, phone, validated, active FROM user WHERE validated = ?";
    const [result] = await pool.query(select, [validated]);
    return result;
  }
  const select = "SELECT id, email, name, role, address, phone, validated, active FROM user";
  const [result] = await pool.query(select);
  return result;
};

const validateUser = async (id) => {
  const update = "UPDATE user SET validated = 1 WHERE id = ?";
  const [result] = await pool.query(update, [id]);
  return result;
};

module.exports = { addUser, selectByEmail, selectById, updateMe, deactivateUser, getUsers, validateUser };
