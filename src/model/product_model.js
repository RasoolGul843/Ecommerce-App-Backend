const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    title: { type: String, required: [true, "title is required"] },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    images: { type: Array, default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date },
    
});

// Before Save
productSchema.pre("save", function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();
   // next();
});

// Before Update
productSchema.pre("updateOne", function (next) {
    const update = this.getUpdate();
    delete update._id;
    update.updatedOn = new Date();
    //next();
});

const ProductModel = model("product", productSchema);

module.exports = ProductModel;