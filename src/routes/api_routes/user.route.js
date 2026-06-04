// ===== IMPORTS =====
// const userController = require("../../controllers/user.controller") // Funciones del controller de usuarios
// const { checkToken } = require("../../middleware/auth") // Middleware que verifica el token JWT

// const router = require("express").Router();

// ===== RUTAS PÚBLICAS =====
// No requieren token, cualquier cliente puede acceder
// router.post("/register", userController.register) // Registra un nuevo usuario
// router.post("/login", userController.login) // Inicia sesión y devuelve un token JWT

// ===== RUTAS PRIVADAS =====
// checkToken verifica el token antes de ejecutar el controller
// Si el token no es válido o no existe, devuelve 403
// router.get("/profile", checkToken, userController.getProfile) // Devuelve los datos del usuario logueado

// module.exports = router;
