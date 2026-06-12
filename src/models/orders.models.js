const connection = require('../config/connection');

const getOrders = async () => {
    const [rows] = await connection.query(
        'SELECT * FROM orders'
    );

    return rows;
};

const getOrderById = async (id) => {
    const [rows] = await connection.query(
        'SELECT * FROM orders WHERE id = ?',
        [id]
    );

    return rows[0];
};

const getAllOrdersAdmin = async () => {
    const [rows] = await connection.query(
        'SELECT * FROM orders ORDER BY order_date DESC'
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
    return {
        message: "Función createOrder del model funcionando",
        userId
    };
};

module.exports = {
    getOrders,
    getOrderById,
    getAllOrdersAdmin,
    updateOrderStatus,
    createOrder
};

