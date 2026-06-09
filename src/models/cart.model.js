// ===== DEPENDENCIAS =====
const pool = require("../config/connection"); // Pool de conexiones a la BD

// ===== GET CART =====
const selectCarByUser = async (id) => {
  const select = `
    SELECT ci.item_id, ci.quantity, i.name, i.price, i.image
  FROM cart c
  JOIN cart_item ci ON c.id = ci.cart_id
  JOIN item i ON ci.item_id = i.id
  WHERE c.user_id = ?
    `;
  const [result] = await pool.query(select, [id]);
};
// ===== ADD ITEM =====

// ===== UPDATE ITEM QUANTITY =====

// ===== DELETE ITEM =====

// ===== DELETE CART =====

module.exports = { selectCarByUser };
