const router = require("express").Router();

const {
    checkToken,
    checkRole
} = require("../../middleware/auth");

const {
    getOrders,
    getOrderById,
    createOrder,
    getAllOrdersAdmin,
    getOrderByIdAdmin,
    updateOrderStatus
} = require("../../controllers/orders.controller");


router.get(
    "/orders",
    checkToken,
    getOrders
);


router.get(
    "/orders/:id",
    checkToken,
    getOrderById
);


router.post(
    "/orders",
    checkToken,
    createOrder
);


router.get(
    "/admin/orders",
    checkToken,
    checkRole("admin"),
    getAllOrdersAdmin
);


router.get(
    "/admin/orders/:id",
    checkToken,
    checkRole("admin"),
    getOrderByIdAdmin
);


router.patch(
    "/admin/orders/:id",
    checkToken,
    checkRole("admin"),
    updateOrderStatus
);

module.exports = router;