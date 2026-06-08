// ===== IMPORTS =====
const userController = require("../../controllers/user.controller"); // Funciones del controller de usuarios.
const { checkToken, checkRole } = require("../../middleware/auth"); // Middleware que verifica el token JWT

const router = require("express").Router(); //Creo un enrutador para mandar las rutas a api.routes

// ===== RUTAS PÚBLICAS =====
// No requieren token, cualquier cliente puede acceder:
router.post("/users/register", userController.register); // Registra un nuevo usuario
router.post("/users/login", userController.login); // Inicia sesión y devuelve un token JWT

// ===== RUTAS PRIVADAS =====
// checkToken verifica el token antes de ejecutar el controller
// Si el token no es válido o no existe, devuelve 403.

// ==== Rutas Usuario ===
router.get("/users/me", checkToken, userController.getMe); // Devuelve el perfil del usuario logueado
router.patch("/users/me", checkToken, userController.updateMe); // Actualiza el perfil del usuario.
router.patch("/users/me/deactivate", checkToken, userController.deactivateMe); // Baja lógica del perfil del usuario.

// ==== Rutas Admin ====
router.get("/admin/users", checkToken, checkRole("admin"), userController.getUsers); // Devuelve una lista de usuarios al admin, con la opción de filtrado.
router.patch("/admin/users/validate/:id", checkToken, checkRole("admin"), userController.validateOneUser); // Validar a un usuario.

module.exports = router;
