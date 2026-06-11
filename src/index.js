// ===== IMPORTS =====
const express = require("express"); // Framework para crear el servidor
const cors = require("cors"); // Permite peticiones desde el frontend (Angular)
require("dotenv").config(); // Carga las variables de entorno del .env.
//const pool = require("./config/connection"); // ← importa el pool (ajusta la ruta si difiere) PRUEBAS
const router = require("./routes/api.routes"); // Enrutador principal. Conexión con las rutas.

// ===== CREAR Y CONFIGURAR EL SERVIDOR =====
const app = express();

app.use(cors());

// Middleware para parsear el body de las peticiones en JSON
// IMPORTANTE: debe ir ANTES de las rutas
app.use(express.json());

// ===== RUTAS DE PRUEBA =====
// == Endpoint para verificar que el servidor funciona correctamente ==
// Puedes eliminarlo cuando el proyecto esté en producción
// app.get("/api/datos", (req, res) => {
//   res.json({ mensaje: "Todo Ok!!" });
// });

// == Prueba de conexion con la base de datos ==
// Verifica que el pool de MySQL responde correctamente
// Puedes eliminarlo cuando el proyecto esté en producción
// app.get("/api/test-db", async (req, res) => {
//   const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
//   res.json(rows);
// });

// ===== RUTAS DE LA API =====
// Engancha el enrutador al servidor bajo el prefijo /api.
// Todas las rutas de la API (api.routes) pasan por aquí.
app.use("/api", router);

// ===== INICIAR EL SERVIDOR =====
// definir el puerto a traves del que escucha
// process.env.PORT lee el puerto de .env
// El console.log es tu confirmación de que todo arrancó bien.
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server listen http://localhost:${PORT}`);
});