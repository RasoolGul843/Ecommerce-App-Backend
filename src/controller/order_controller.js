const OrderModel = require("../model/order_model");

const OrderController = {
    createOrder: async function (req, res) {
        try {
            const { user, items } = req.body;
            const newOrder = new OrderModel({ user, items });
            await newOrder.save();
            return res.json({
                success: true,
                data: newOrder,
                message: "Order created successfully"
            });
        } catch (error) {
            return res.json({ success: false, message: error.message });
        }
    },

    fetchOrder: async function (req, res) {
        try {
            const userId = req.params.userId;
            const foundOrders = await OrderModel.find({ user: userId }).populate("items.product");

            if (!foundOrders || foundOrders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found for this user"
                });
            }

            return res.json({ success: true, data: foundOrders });
        } catch (error) {
            return res.json({ success: false, message: error.message });
        }
    }
};

module.exports = OrderController;