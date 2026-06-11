const connection = require('../config/connection');

const getAllCommunities = async () => {
    const [rows] = await connection.query(
        'SELECT * FROM community'
    );

    return rows;
};

module.exports = {
    getAllCommunities
};