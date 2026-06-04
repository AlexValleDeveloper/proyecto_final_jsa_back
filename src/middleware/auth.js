/**
 * Middleware de autenticación JWT
 * Verifica que la petición incluye un token válido en el header Authorization
 * Uso en rutas: router.get("/ruta", checkToken, controller.funcion)
 */

const { verifyToken } = require("../utils/jwt");

const checkToken = (req, res, next) => {
  try {
    // Comprueba que existe el header Authorization
    if (!req.headers.authorization) {
      return res.status(403).json({ msj: "El token es obligatorio" });
    }

    // Extrae el token del header (formato: "Bearer <token>")
    const token = req.headers.authorization.split(" ")[1];

    // Verifica que el token es válido
    const resultToken = verifyToken(token);
    if (!resultToken) {
      return res.status(403).json({ msj: "El token es invalido" });
    }

    // Guarda los datos del usuario en req.userLogin para usarlos en el controller
    req.userLogin = resultToken;
    next(); // Pasa al siguiente middleware o controller
  } catch (error) {
    console.log(error);
  }
};

/**
 * Middleware de autorización por rol
 * Verifica que el usuario tiene el rol necesario para acceder a la ruta
 * Debe usarse siempre después de checkToken
 * Uso en rutas: router.get("/ruta", checkToken, checkRole("admin"), controller.funcion)
 */

// const checkRole = (role) => {
//     return (req, res, next) => {
//         // req.userLogin lo añade checkToken con los datos del usuario
//         if (req.userLogin.role !== role) {
//             return res.status(403).json({ msj: "No tienes permisos" });
//         }
//         next();
//     }
// }

module.exports = { checkToken };
