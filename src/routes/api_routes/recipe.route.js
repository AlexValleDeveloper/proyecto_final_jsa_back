// Importamos Express
const express = require("express");

// Creamos un objeto router
// Este router servirá para registrar las rutas de recetas
const router = express.Router();

// Importamos los middlewares de autenticación y autorización
const { checkToken, checkRole } = require("../../middleware/auth");

// Importamos las funciones del controller
// Estas funciones son las que se ejecutarán cuando alguien llame a nuestras rutas
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../../controllers/recipe.controller");

// GET /recipes
// Cuando alguien haga una petición GET a /recipes,
// se ejecutará la función getRecipes del controller
router.get("/recipes", getRecipes);

// POST /admin/recipes
// Crea una nueva receta
// Solo usuarios con rol admin
router.post(
  "/admin/recipes",
  checkToken,
  checkRole("admin"),
  createRecipe
);

// PUT /admin/recipes/:id
// Actualiza una receta existente
//
// Ejemplos:
// /admin/recipes/1
// /admin/recipes/5
// /admin/recipes/20
//
// El id llegará al controller mediante:
// req.params.id
//
// Solo usuarios con rol admin
router.put(
  "/admin/recipes/:id",
  checkToken,
  checkRole("admin"),
  updateRecipe
);

// DELETE /admin/recipes/:id
// Elimina una receta existente
//
// Ejemplos:
// /admin/recipes/1
// /admin/recipes/5
// /admin/recipes/20
//
// El id llegará al controller mediante:
// req.params.id
//
// Solo usuarios con rol admin
router.delete(
  "/admin/recipes/:id",
  checkToken,
  checkRole("admin"),
  deleteRecipe
);

// GET /recipes/:id
// :id es un parámetro dinámico
//
// Ejemplos:
// /recipes/1
// /recipes/5
// /recipes/20
//
// Todos ejecutarán getRecipeById
//
// El valor llegará al controller mediante:
// req.params.id
router.get("/recipes/:id", getRecipeById);

// Exportamos el router
// Esto permite que server.js o app.js pueda utilizar estas rutas
module.exports = router;