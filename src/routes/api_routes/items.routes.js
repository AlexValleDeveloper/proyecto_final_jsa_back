const { checkToken, checkRole } = require('../../middleware/auth');
const express = require('express');
const router = express.Router();

const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
} = require('../../controllers/items.controller');

router.get('/items', getItems);
router.get('/items/:id', getItem);

router.post('/admin/items', checkToken, checkRole('admin'), createItem);
router.patch('/admin/items/:id', checkToken, checkRole('admin'), updateItem);
router.delete('/admin/items/:id', checkToken, checkRole('admin'), deleteItem);

module.exports = router;