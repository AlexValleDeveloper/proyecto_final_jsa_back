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

// checkRole se usa en user.route.js para proteger rutas exclusivas de administrador
// module.exports = { checkRole };
