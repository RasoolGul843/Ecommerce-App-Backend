const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, default: 1 }
});

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [cartItemSchema], default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

// Before Save
cartSchema.pre("save", function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();
    //next();
});

// Before Update
cartSchema.pre("updateOne", function (next) {
    const update = this.getUpdate();
    delete update._id;
    update.updatedOn = new Date();
   // next();
});

const CartModel = model("cart", cartSchema);

module.exports = CartModel;