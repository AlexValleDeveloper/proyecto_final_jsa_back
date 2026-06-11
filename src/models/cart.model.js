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

// ===== DELETE ITEM =====

// ===== DELETE CART =====

module.exports = { selectCarByUser, selectCartByUserId, addItem };
