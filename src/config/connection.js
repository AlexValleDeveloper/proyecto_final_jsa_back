//CONEXION CON BD (BASE DE DATOS)
const mysql = require("mysql2"); // Driver de MySQL para Node.js

/**
 * Pool de conexiones a la base de datos MySQL
 * Un pool gestiona múltiples conexiones simultáneas en lugar de abrir y cerrar
 * una conexión por cada consulta — es más eficiente y escalable.
 * Las credenciales se cargan desde el .env — nunca las escribas aquí directamente.
 */
const pool = mysql.createPool({
  host: process.env.HOST_DB, // Servidor de la BD (ej: localhost)
  user: process.env.USER_DB, // Usuario de la BD
  password: process.env.PASSWORD_DB, // Contraseña de la BD
  port: process.env.PORT_DB, // Puerto de MySQL (por defecto 3306)
  database: process.env.NAME_DB, // Nombre de la BD
});

// Exportamos el pool con soporte de promesas para usar async/await en los modelos
module.exports = pool.promise();
