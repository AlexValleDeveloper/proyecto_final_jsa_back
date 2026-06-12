// ===== DEPENDENCIAS =====
const cartModel = require("../models/cart.model"); //Funciones que ejecután los SQL

// ===== GET CART =====
const getCart = async (req, res) => {
  try {
    // 1. Saco el user_id del token
    const id = req.userLogin.id;
    // 2. Llamo al model para obtener las líneas del carrito
    const cartItems = await cartModel.selectCarByUser(id);
    // 3. Calculo el total (price * quantity de cada línea, sumado)
    // Usaria un bucle "for of", pero voy a aprender a usar "reduce"
    const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    // 4. Respondo 200 con los items y el total
    return res.status(200).json({ msj: "Carrito obtenido", cartItems: cartItems, totalPrice: totalPrice });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};
// ===== ADD ITEM =====
const addItem = async (req, res) => {
  try {
    // 1. Saco el user_id del token
    const userId = req.userLogin.id;
    // 2. Busco el cart_id del usuario llamando a la funcion "selectCartByUserId" del model.
    const cart = await cartModel.selectCartByUserId(userId);
    const cartId = cart[0].id;
    // 3. Recojo itemId y quantity del body
    const data = req.body;
    // 4. Llamo al model con cartId, itemId y quantity
    const cartData = await cartModel.addItem(cartId, data.itemId, data.quantity);
    // 5.
    if (cartData.affectedRows === 0) {
      return res.status(500).json({ msj: "No se pudo añadir el producto" });
    }
    // 6. Respondo 201
    return res.status(201).json({ msj: "Producto añadido" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

// ===== UPDATE ITEM QUANTITY =====
const updateItem = async (req, res) => {
  try {
    // 1. Saco el user_id del token. Lo necesito para identificar el carrito del usuario.
    const userId = req.userLogin.id;
    // 2. Busco el carrito (cart_id) del usuario llamando a la funcion "selectCartByUserId" del model.
    const cart = await cartModel.selectCartByUserId(userId);
    const cartId = cart[0].id;
    // 3. Recojo el itemId de los req.params ya que eso viene en la URL /:item_id
    const itemId = req.params.item_id;
    // 4. Recojo quantity del req.body
    const quantity = req.body.quantity;
    // 5. Llamo al model con todo ya recabado, para actualizar la cantidad.
    const updatedCart = await cartModel.updateItem(cartId, itemId, quantity);
    // 6. Validacion de si el item no existe en el carrito.
    if (updatedCart.affectedRows === 0) {
      return res.status(404).json({ msj: "producto no encontrado" });
    }
    // 7. Respondo 200
    return res.status(200).json({ msj: "Cantidad actualizada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};
// ===== DELETE ITEM =====
const deleteItem = async (req, res) => {
  try {
    // 1. Saco el user_id del token. Lo necesito para identificar el carrito del usuario.
    const userId = req.userLogin.id;
    // 2. Busco el cart_id del usuario llamando a la funcion "selectCartByUserId" del model.
    const cart = await cartModel.selectCartByUserId(userId);
    const cartId = cart[0].id;
    // 3. Recojo el itemId de los req.params ya que eso viene en la URL /:item_id
    const itemId = req.params.item_id;
    // 5. Llamo al model con todo ya recabado, para borrar la fila (la del item correspondiente).
    const deletedItem = await cartModel.deleteItem(cartId, itemId);
    // 6. Validacion de si el item no existe en el carrito.
    if (deletedItem.affectedRows === 0) {
      return res.status(404).json({ msj: "producto no encontrado" });
    }
    // 7. Respondo 204
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};
// ===== DELETE CART =====
const deleteCart = async (req, res) => {
  try {
    // 1. Saco el user_id del token. Lo necesito para identificar el carrito del usuario
    const userId = req.userLogin.id;
    // 2. Busco el cart_id del usuario llamando a la funcion "selectCartByUserId" del model.
    const cart = await cartModel.selectCartByUserId(userId);
    const cartId = cart[0].id;
    // 5. Llamo al model para borrar todas las líneas del carrito. para la función solo necesito el cartId como parametro.
    const deletedCart = await cartModel.deleteCart(cartId);
    // 6. Validacion? aquí realmente hace falta? el resultado será el mismo ya estuviese vacio o no..
    // 7. Respondo 204 directamente.
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};
module.exports = { getCart, addItem, updateItem, deleteItem, deleteCart };
