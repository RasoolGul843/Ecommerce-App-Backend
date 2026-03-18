const { randomUUID } = require("crypto");
const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

/////////----------  user Schema -----------------//////////
const userSchema = new Schema({
    id: { type: String, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    profileprogress: { type: Number, default: 0 },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

/////////---------- Before Save ------------------//////////
userSchema.pre("save", function () {
    if (!this.id) this.id = randomUUID();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    // Hash password if modified or new
    if (this.isModified("password")) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
});

/////////---------- Before Update ------------------//////////
userSchema.pre("updateOne", function () {
    const update = this.getUpdate();
    if (!update) return;
    delete update._id;
    delete update.id;
    update.updatedOn = new Date();
});

userSchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();
    if (!update) return;
    delete update._id;
    delete update.id;
    update.updatedOn = new Date();
});

const userModel = model("Users", userSchema);

module.exports = userModel;