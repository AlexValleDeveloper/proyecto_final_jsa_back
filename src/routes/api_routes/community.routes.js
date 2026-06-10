const express = require('express');
const router = express.Router();

const {
    getCommunities
} = require('../../controllers/community.controller');

router.get('/communities', getCommunities);

module.exports = router;