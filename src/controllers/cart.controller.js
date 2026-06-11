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
    // 5. Respondo 201
    if (cartData.affectedRows === 0) {
      return res.status(500).json({ msj: "No se pudo añadir el producto" });
    }
    return res.status(201).json({ msj: "Producto añadido" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "Error en el servidor" });
  }
};

// ===== UPDATE ITEM QUANTITY =====

// ===== DELETE ITEM =====

// ===== DELETE CART =====

module.exports = { getCart, addItem };
