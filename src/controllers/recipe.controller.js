// Importamos el modelo.
// El modelo es el encargado de hablar con la base de datos.
const recipeModel = require("../models/recipe.model");


// Función que se ejecutará cuando alguien haga:
// GET /recipes
const getRecipes = async (req, res) => {

  try {

    // Obtenemos el filtro de comunidad desde la query string.
    // Ejemplo:
    // /recipes?community=1
    const { community } = req.query;

    // Llamamos al modelo para obtener todas las recetas
    // o únicamente las de una comunidad concreta.
    const recipes = await recipeModel.getRecipes(community);

    // Respondemos con código 200 (OK)
    // y enviamos las recetas en formato JSON.
    res.status(200).json(recipes);

  } catch (error) {

    // Si ocurre algún error, devolvemos un error 500.
    res.status(500).json({
      message: "Error getting recipes",
    });

  }
};


// Función que se ejecutará cuando alguien haga:
// GET /recipes/:id
const getRecipeById = async (req, res) => {

  try {

    // Extraemos el parámetro id de la URL.
    const { id } = req.params;

    // Pedimos al modelo la receta con ese id.
    const recipe = await recipeModel.getRecipeById(id);

    // Si no existe ninguna receta con ese id...
    if (!recipe) {

      return res.status(404).json({
        message: "Recipe not found",
      });

    }

    // Si la receta existe, la devolvemos.
    res.status(200).json(recipe);

  } catch (error) {

    res.status(500).json({
      message: "Error getting recipe",
    });

  }
};


// Función que se ejecutará cuando alguien haga:
// POST /admin/recipes
const createRecipe = async (req, res) => {

  try {

    // Extraemos los datos enviados en el body.
    const {
      community_id,
      name,
      instructions,
    } = req.body;

    // Llamamos al modelo para insertar la receta.
    const recipeId = await recipeModel.createRecipe({
      community_id,
      name,
      instructions,
    });

    // Devolvemos código 201 (Creado).
    res.status(201).json({
      message: "Recipe created successfully",
      id: recipeId,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error creating recipe",
    });

  }
};


// Función que se ejecutará cuando alguien haga:
// PUT /admin/recipes/:id
const updateRecipe = async (req, res) => {

  try {

    // Obtenemos el id de la URL.
    const { id } = req.params;

    // Obtenemos los datos enviados en el body.
    const {
      community_id,
      name,
      instructions,
    } = req.body;

    // Llamamos al modelo para actualizar la receta.
    const updated = await recipeModel.updateRecipe(id, {
      community_id,
      name,
      instructions,
    });

    // Si no existe la receta.
    if (!updated) {

      return res.status(404).json({
        message: "Recipe not found",
      });

    }

    // Si todo va bien.
    res.status(200).json({
      message: "Recipe updated successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error updating recipe",
    });

  }
};


// Función que se ejecutará cuando alguien haga:
// DELETE /admin/recipes/:id
const deleteRecipe = async (req, res) => {

  try {

    // Obtenemos el id de la URL.
    const { id } = req.params;

    // Llamamos al modelo para eliminar la receta.
    const deleted = await recipeModel.deleteRecipe(id);

    // Si la receta no existe.
    if (!deleted) {

      return res.status(404).json({
        message: "Recipe not found",
      });

    }

    // Si todo va bien.
    res.status(200).json({
      message: "Recipe deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error deleting recipe",
    });

  }
};


// Exportamos las funciones para que puedan usarse
// desde recipe.router.js.
module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};