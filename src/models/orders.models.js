const connection = require("../config/connection");

const getOrders = async () => {
    const [rows] = await connection.query(
        "SELECT * FROM orders"
    );

    return rows;
};

const getOrderById = async (id) => {
    const [rows] = await connection.query(
        "SELECT * FROM orders WHERE id = ?",
        [id]
    );

    return rows[0];
};

const getAllOrdersAdmin = async () => {
    const [rows] = await connection.query(
        "SELECT * FROM orders ORDER BY order_date DESC"
    );

    return rows;
};

const updateOrderStatus = async (id, status) => {
    const [result] = await connection.query(
        `UPDATE orders
         SET status = ?,
             shipping_date = CASE
                 WHEN ? = 'shipped' THEN CURDATE()
                 ELSE shipping_date
             END
         WHERE id = ?`,
        [status, status, id]
    );

    return result.affectedRows;
};

const createOrder = async (userId) => {
    const db = await connection.getConnection();

    try {
        await db.beginTransaction();

        const [cartItems] = await db.query(
            `SELECT
                c.id AS cartId,
                ci.item_id AS itemId,
                ci.quantity,
                i.name,
                i.price,
                i.stock
            FROM cart c
            JOIN cart_item ci ON c.id = ci.cart_id
            JOIN item i ON ci.item_id = i.id
            WHERE c.user_id = ?`,
            [userId]
        );

        if (cartItems.length === 0) {
            const error = new Error("El carrito está vacío");
            error.status = 400;
            throw error;
        }

        for (const item of cartItems) {
            if (item.quantity > item.stock) {
                const error = new Error(`Stock insuficiente para ${item.name}`);
                error.status = 409;
                throw error;
            }
        }

        const total = cartItems.reduce((acc, item) => {
            return acc + parseFloat(item.price) * item.quantity;
        }, 0);

        const [orderResult] = await db.query(
            `INSERT INTO orders (user_id, total, status)
             VALUES (?, ?, 'pending')`,
            [userId, total]
        );

        const orderId = orderResult.insertId;

        for (const item of cartItems) {
            await db.query(
                `INSERT INTO orders_item
                (order_id, item_id, quantity, unit_price)
                VALUES (?, ?, ?, ?)`,
                [orderId, item.itemId, item.quantity, item.price]
            );

            await db.query(
                `UPDATE item
                 SET stock = stock - ?
                 WHERE id = ?`,
                [item.quantity, item.itemId]
            );
        }

        await db.query(
            `DELETE FROM cart_item
             WHERE cart_id = ?`,
            [cartItems[0].cartId]
        );

        await db.commit();

        return {
            orderId,
            cartItems,
            total
        };

    } catch (error) {
        await db.rollback();
        throw error;
    } finally {
        db.release();
    }
};

module.exports = {
    getOrders,
    getOrderById,
    getAllOrdersAdmin,
    updateOrderStatus,
    createOrder
};