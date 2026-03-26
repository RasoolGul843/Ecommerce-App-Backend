const { Schema, model } = require("mongoose");

// Sub-schema for order items
const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,  // store product _id
        ref: "product",
        required: true
    },
    quantity: { type: Number, default: 1 }
});

// Main order schema
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,  // store user _id
        ref: "User",
        required: true
    },
    items: { type: [orderItemSchema], default: [] },
    status: { type: String, default: "order placed" },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

// Hooks
orderSchema.pre("save", function (next) {
    this.updatedOn = new Date();
    this.createdOn = this.createdOn || new Date();
    next();
});

orderSchema.pre("updateOne", function (next) {
    const update = this.getUpdate();
    delete update._id;
    update.updatedOn = new Date();
    next();
});

const OrderModel = model("order", orderSchema);

module.exports = OrderModel;