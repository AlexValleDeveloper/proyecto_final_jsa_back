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

module.exports = { checkToken };
