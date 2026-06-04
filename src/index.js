// ===== IMPORTS =====
const express = require("express"); // Framework para crear el servidor
require("dotenv").config(); // Carga las variables de entorno del .env.
const pool = require("./config/connection"); // ← importa el pool (ajusta la ruta si difiere)

// ===== CREAR Y CONFIGURAR EL SERVIDOR =====
const app = express();
app.use(express.json()); // Middleware para parsear el body de las peticiones en JSON

// ===== RUTA DE PRUEBA =====
// Endpoint para verificar que el servidor funciona correctamente
// Puedes eliminarlo cuando el proyecto esté en producción
// app.get("/api/datos", (req, res) => {
//   res.json({ mensaje: "Todo Ok!!" });
// });
app.get("/api/test-db", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
  res.json(rows);
});
// ===== RUTAS DE LA API =====
// Todas las rutas de la API pasan por aquí con el prefijo /api

// ===== INICIAR EL SERVIDOR =====
// definir el puerto  a traves del que escucha
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listen http://localhost:${PORT}`);
});
