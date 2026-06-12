const OrdersModel = require("../models/orders.models");

const getOrders = async (req, res) => {
    try {
        const orders = await OrdersModel.getOrders();

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los pedidos",
            error: error.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await OrdersModel.getOrderById(id);

        if (!order) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        if (order.user_id !== req.userLogin.id) {
            return res.status(403).json({
                message: "No puedes ver un pedido que no es tuyo"
            });
        }

        res.json(order);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el pedido",
            error: error.message
        });
    }
};

const getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await OrdersModel.getAllOrdersAdmin();

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todos los pedidos",
            error: error.message
        });
    }
};

const getOrderByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await OrdersModel.getOrderById(id);

        if (!order) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        res.json(order);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el pedido admin",
            error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatus = ["pending", "processing", "shipped"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                message: "Estado no válido"
            });
        }

        const order = await OrdersModel.getOrderById(id);

        if (!order) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        const validTransitions = {
            pending: "processing",
            processing: "shipped",
            shipped: null
        };

        if (validTransitions[order.status] !== status) {
            return res.status(400).json({
                message: "Transición de estado no válida"
            });
        }

        await OrdersModel.updateOrderStatus(id, status);

        res.json({
            message: "Estado del pedido actualizado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el estado del pedido",
            error: error.message
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const userId = req.userLogin.id;

        const result = await OrdersModel.createOrder(userId);

        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            message: "Error al crear el pedido",
            error: error.message
        });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    getAllOrdersAdmin,
    getOrderByIdAdmin,
    updateOrderStatus
};

