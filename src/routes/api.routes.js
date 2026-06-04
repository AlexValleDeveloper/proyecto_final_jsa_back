//ESTE FICHERO ES PARA UNIFICAR RUTAS

// Crea un router de Express para agrupar las rutas. (paquete de rutas)
const router = require("express").Router();

// ===== IMPORTAR RUTAS =====
// Aquí se importan y registran todas las rutas de la API
// Añade una línea por cada nuevo recurso de tu proyecto
//RUTAS DE EJEMPLO:
// router.use("/", require("./api_routes/user.route")); // Rutas de usuarios
// router.use("/", require("./api_routes/nombreRecurso.route")) // Rutas de tu recurso

module.exports = router; // Exporta el router para usarlo en index.js
