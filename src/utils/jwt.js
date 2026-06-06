const jwt = require("jsonwebtoken"); // Librería para crear y verificar tokens JWT

/**
 * ¿Qué es un JWT?
 * Es un token — una cadena de texto firmada que el servidor genera cuando el usuario hace login.
 * El cliente lo guarda y lo envía en cada petición privada para demostrar que está autenticado.
 * Tiene 3 partes separadas por puntos: header.payload.signature
 * - header: tipo de token y algoritmo de cifrado
 * - payload: datos que guardamos dentro (id, email, role...)
 * - signature: firma que garantiza que el token no ha sido manipulado
 */

/**
 * Crea un token JWT con los datos del usuario
 * @param {object} info - Objeto con los datos a guardar dentro del token (id, email, role...)
 * @returns {string} - El token generado
 *
 * El token se firma con JWT_SECRET_KEY — una clave secreta que solo conoce el servidor.
 * Si alguien manipula el token, la firma no coincide y el servidor lo rechaza.
 * expiresIn: '1h' — el token caduca en 1 hora, después el usuario tendrá que volver a hacer login
 */
const createToken = (info) => {
  return jwt.sign(info, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

/**
 * Verifica que un token JWT es válido
 * @param {string} token - El token que envía el cliente en el header: Authorization req.header.authorizathion
 * @returns {object|false} - Los datos guardados dentro del token si es válido, false si no lo es
 *
 * Un token puede ser inválido por dos razones:
 * - Ha sido manipulado (la firma no coincide)
 * - Ha caducado (pasó más de 1 hora desde que se creó)
 * En ambos casos jwt.verify() lanza un error, lo capturamos y devolvemos false
 */
const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return data; // Devuelve el payload — los datos que guardamos al crear el token
  } catch (error) {
    return false; // Token inválido o caducado
  }
};

// createToken se usa en user.controller.js (login) — verifyToken se usa en middleware/auth.js (checkToken)
module.exports = { createToken, verifyToken };
