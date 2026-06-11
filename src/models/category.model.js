const connection = require('../config/connection');

const getAllCategories = async () => {
    const [rows] = await connection.query(
        'SELECT * FROM category'
    );

    return rows;
};

module.exports = {
    getAllCategories
};