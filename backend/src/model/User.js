const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const User = new Schema(
    {
        email: { type: String, require: true },
        password: { type: String, require: true },
        username: { type: String, unique: true },
        name: { type: String, default: "" },
        website: { type: String, default: "" },
        phoneNumber: { type: String, default: "" },
        bio: { type: String, default: "" },
        gender: { type: String, default: "" },
        avatar: { type: String, default: "" },
        dateOfBirth: { type: Date, default: "" },
        followersCount: { type: Number, default: 0 },
        followingsCount: { type: Number, default: 0 },
        postCount: { type: Number, default: 0 },
        tick: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Middleware
User.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

User.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
    }
};

module.exports = mongoose.model("User", User);