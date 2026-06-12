// ===== DEPENDENCIAS =====
const pool = require("../config/connection"); // Pool de conexiones a la BD

// ===== GET CART =====
const selectCarByUser = async (id) => {
  const select = `
    SELECT ci.item_id AS itemId, ci.quantity, i.name, i.price, i.image
  FROM cart c
  JOIN cart_item ci ON c.id = ci.cart_id
  JOIN item i ON ci.item_id = i.id
  WHERE c.user_id = ?
    `;
  const [result] = await pool.query(select, [id]);
  return result;
};
// ===== ADD ITEM =====
const selectCartByUserId = async (id) => {
  const select = "SELECT id FROM cart WHERE user_id = ?";
  const [result] = await pool.query(select, [id]);
  return result;
};

const addItem = async (cartId, itemId, quantity) => {
  const insertOrUpdate = `
  INSERT INTO cart_item (cart_id, item_id, quantity) VALUES (?, ? ,?)
  ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  `;
  const [result] = await pool.query(insertOrUpdate, [cartId, itemId, quantity]);
  return result;
};

// ===== UPDATE ITEM QUANTITY =====
const updateItem = async (cartId, itemId, quantity) => {
  const update = "UPDATE cart_item SET quantity = ? WHERE cart_id = ? AND item_id = ?";
  const [result] = await pool.query(update, [quantity, cartId, itemId]);
  return result;
};

// ===== DELETE ITEM =====
const deleteItem = async (cartId, itemId) => {
  const remove = "DELETE FROM cart_item WHERE cart_id = ? AND item_id = ?";
  const [result] = await pool.query(remove, [cartId, itemId]);
  return result;
};

// ===== DELETE CART =====
const deleteCart = async (cartId) => {
  const remove = "DELETE FROM cart_item WHERE cart_id = ?";
  const [result] = await pool.query(remove, [cartId]);
  return result;
};

module.exports = { selectCarByUser, selectCartByUserId, addItem, updateItem, deleteItem, deleteCart };
