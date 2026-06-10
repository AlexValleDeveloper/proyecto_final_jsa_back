const itemModel = require('../models/items.model');

const getItems = async (req, res) => {
    try {
        const items = await itemModel.getAllItems(req.query);

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await itemModel.getItemById(id);

        if (!item) {
            return res.status(404).json({
                message: 'Item no encontrado'
            });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createItem = async (req, res) => {
    try {
        console.log(req.body);

        const newItemId = await itemModel.createItem(req.body);

        res.status(201).json({
            message: 'Item creado correctamente',
            id: newItemId
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await itemModel.updateItem(id, req.body);

        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Item no encontrado'
            });
        }

        res.status(200).json({
            message: 'Item actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await itemModel.deleteItem(id);

        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Item no encontrado'
            });
        }

        res.status(200).json({
            message: 'Item eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};