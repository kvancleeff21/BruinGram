const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        postId: { type: Schema.Types.ObjectId, ref: "Post", require: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
        content: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);