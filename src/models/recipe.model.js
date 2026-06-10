// Importamos la conexión a la base de datos.
// "pool" nos permitirá ejecutar consultas SQL.
const pool = require("../config/connection");

// Función para obtener todas las recetas.
const getRecipes = async () => {

  const [rows] = await pool.query(
    "SELECT id, name FROM recipe"
  );

  console.log("RECIPES:", rows);

  return rows;
};

// Función para obtener una receta concreta por su id.
const getRecipeById = async (id) => {

  const [rows] = await pool.query(
    "SELECT * FROM recipe WHERE id = ?",
    [id]
  );

  console.log("RECIPE:", rows);

  return rows[0];
};

// Función para crear una nueva receta.
const createRecipe = async (recipeData) => {

  const [result] = await pool.query(
    `INSERT INTO recipe (community_id, name, recipe)
     VALUES (?, ?, ?)`,
    [
      recipeData.community_id,
      recipeData.name,
      recipeData.recipe,
    ]
  );

  return result.insertId;
};

// Función para actualizar una receta existente.
const updateRecipe = async (id, recipeData) => {

  const [result] = await pool.query(
    `UPDATE recipe
     SET community_id = ?, name = ?, recipe = ?
     WHERE id = ?`,
    [
      recipeData.community_id,
      recipeData.name,
      recipeData.recipe,
      id,
    ]
  );

  return result.affectedRows;
};

// Función para eliminar una receta.
const deleteRecipe = async (id) => {

  const [result] = await pool.query(
    "DELETE FROM recipe WHERE id = ?",
    [id]
  );

  return result.affectedRows;
};

// Exportamos las funciones para que puedan usarse
// desde recipe.controller.js.
module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};