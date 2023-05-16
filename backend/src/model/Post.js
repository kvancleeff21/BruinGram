const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
        description: { type: String },
        postAssets: { type: Array },
        likesCount: { type: Number, default: 0 },
        commentsCount: { type: Number, default: 0 },
        sharesCount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", Post);