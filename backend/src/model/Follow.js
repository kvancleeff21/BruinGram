const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema(
    {
        followId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        }, // As A
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // As B => B is following A
        //FollowId: 6358dc1d3c130b065bfb4c33 (admin)
        //UserId: 6358fcb94b62575f7d1433ee (jennie)
        // => jennie following admin
    },
    { timestamps: true }
);

module.exports = mongoose.model("Follow", FollowSchema);