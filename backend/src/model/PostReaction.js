const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostReactionSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("PostReaction", PostReactionSchema);