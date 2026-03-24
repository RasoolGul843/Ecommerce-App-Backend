const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    title: { type: String, required: [true, "title is required"] },
    description: { type: String, default: "" },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

/////////---------- Before Save ------------------//////////
categorySchema.pre("save", function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();
   // next();
});

/////////---------- Before Update ------------------//////////
categorySchema.pre("updateOne", function (next) {
    const update = this.getUpdate();
    delete update.id;
    update.updatedOn = new Date();
   // next();
});

const CategoryModel = model("category", categorySchema);

module.exports = CategoryModel;