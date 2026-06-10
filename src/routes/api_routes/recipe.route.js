// Importamos Express
const express = require("express");

// Creamos un objeto router
// Este router servirá para registrar las rutas de recetas
const router = express.Router();


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
router.post("/admin/recipes", createRecipe);


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
router.put("/admin/recipes/:id", updateRecipe);


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
router.delete("/admin/recipes/:id", deleteRecipe);


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