//ESTE FICHERO ES UN ENRUTADOR PRINCIPAL PARA UNIFICAR LAS RUTAS DE LOS RECURSOS.

// Crea un router de Express para agrupar las rutas. (paquete de rutas)
const router = require("express").Router();

// ===== IMPORTAR RUTAS =====
// Aquí se importan y registran todas las rutas de la API.
// Añade una línea por cada nuevo recurso de tu proyecto.
//Descomenta la línea de un recurso SOLO y SOLO cuando su fichero de ruta tenga rutas reales funcionando y esté ya mergeado (unido) a main.
// NO reordenes NI toques las líneas de otros recursos: añade la tuya si no coincide o descomenta solo la tuya.

// ===== REGISTRO DE RECURSOS =====
// --- Catálogo público ---
// router.use("/", require("./api_routes/community.route"));
// router.use("/", require("./api_routes/category.route"));
 router.use("/", require("./api_routes/recipe.route"));
// router.use("/", require("./api_routes/item.route"));

// --- Usuarios / autenticación ---
router.use("/", require("./api_routes/user.route"));

// --- Carrito ---
// router.use("/", require("./api_routes/cart.route"));

// --- Pedidos ---
// router.use("/", require("./api_routes/order.route"));

module.exports = router; // Exporta el router para usarlo en index.js
