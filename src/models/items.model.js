const connection = require('../config/connection');

const getAllItems = async (filters) => {
    let sql = 'SELECT * FROM item WHERE status = 1';
    const values = [];

    if (filters.search) {
        sql += ' AND name LIKE ?';
        values.push(`%${filters.search}%`);
    }

    if (filters.category) {
        sql += ' AND category_id = ?';
        values.push(filters.category);
    }

    if (filters.community) {
        sql += ' AND community_id = ?';
        values.push(filters.community);
    }

    if (filters.minPrice) {
        sql += ' AND price >= ?';
        values.push(filters.minPrice);
    }

    if (filters.maxPrice) {
        sql += ' AND price <= ?';
        values.push(filters.maxPrice);
    }

    const [rows] = await connection.query(sql, values);

    return rows;
};

const getItemById = async (id) => {
    const [rows] = await connection.query(
        'SELECT * FROM item WHERE id = ? AND status = 1',
        [id]
    );

    return rows[0];
};

const createItem = async (item) => {
    const {
        name,
        price,
        stock,
        description,
        image,
        categoryId,
        communityId
    } = item;

    const [result] = await connection.query(
        `INSERT INTO item
        (name, price, stock, description, image, category_id, community_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, price, stock, description, image, categoryId, communityId]
    );

    return result.insertId;
};

const updateItem = async (id, item) => {
    const {
        name,
        price,
        stock,
        description,
        image,
        categoryId,
        communityId
    } = item;

    const [result] = await connection.query(
        `UPDATE item
        SET name = ?, price = ?, stock = ?, description = ?, image = ?, category_id = ?, community_id = ?
        WHERE id = ? AND status = 1`,
        [name, price, stock, description, image, categoryId, communityId, id]
    );

    return result.affectedRows;
};

const deleteItem = async (id) => {
    const [result] = await connection.query(
        'UPDATE item SET status = 0 WHERE id = ?',
        [id]
    );

    return result.affectedRows;
};
module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};