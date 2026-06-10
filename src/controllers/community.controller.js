const communityModel = require('../models/community.model');

const getCommunities = async (req, res) => {
    try {
        const communities = await communityModel.getAllCommunities();

        res.status(200).json(communities);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getCommunities
};