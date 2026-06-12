// ===== DEPENDENCIAS =====
const cartController = require("../../controllers/cart.controller"); // Funciones del controller de cart.
const { checkToken } = require("../../middleware/auth"); // Middleware que verifica el token JWT

const router = require("express").Router(); // Creo un enrutador para mandar las rutas a api.routes

// ===== RUTAS PRIVADAS =====
// Todas requieren checkToken — no hay rutas públicas en cart
// GET /cart
router.get("/cart", checkToken, cartController.getCart);

// POST /cart/items
router.post("/cart/items", checkToken, cartController.addItem);

// PATCH /cart/items/:item_id
router.patch("/cart/items/:item_id", checkToken, cartController.updateItem);

// DELETE /cart/items/:item_id
router.delete("/cart/items/:item_id", checkToken, cartController.deleteItem);

// DELETE /cart
router.delete("/cart", checkToken, cartController.deleteCart);

module.exports = router;
