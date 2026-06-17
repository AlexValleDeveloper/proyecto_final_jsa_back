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

        // Carrito vacío
        if (cartItems.length === 0) {
            const error = new Error("El carrito está vacío");
            error.status = 400;
            throw error;
        }

        // Usuario validado + datos obligatorios
        const [userRows] = await db.query(
            `SELECT validated, address, phone
             FROM user
             WHERE id = ? AND active = 1`,
            [userId]
        );

        if (userRows.length === 0) {
            const error = new Error("Usuario no encontrado o inactivo");
            error.status = 404;
            throw error;
        }

        const user = userRows[0];

        if (user.validated === 0) {
            const error = new Error(
                "Debes estar validado por el administrador para confirmar un pedido"
            );
            error.status = 403;
            throw error;
        }

        if (!user.address || !user.phone) {
            const error = new Error(
                "Debes completar dirección y teléfono antes de confirmar un pedido"
            );
            error.status = 400;
            throw error;
        }

        // Comprobar stock
        for (const item of cartItems) {
            if (item.quantity > item.stock) {
                const error = new Error(
                    `Stock insuficiente para ${item.name}`
                );
                error.status = 409;
                throw error;
            }
        }

        // Calcular total
        const total = cartItems.reduce((acc, item) => {
            return acc + parseFloat(item.price) * item.quantity;
        }, 0);

        // Crear pedido
        const [orderResult] = await db.query(
            `INSERT INTO orders (user_id, total, status)
             VALUES (?, ?, 'pending')`,
            [userId, total]
        );

        const orderId = orderResult.insertId;

        // Insertar líneas y descontar stock
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

        // Vaciar carrito
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