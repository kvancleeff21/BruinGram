const Comment = require("../../../model/Comment");
const Post = require("../../../model/Post");
const User = require("../../../model/User");

// Get all comment for postId
const getComments = async (req, next) => {
    try {
        const perPage = req.query.perPage || 10; // 
        const page = req.query.page || 1;
        const { postId } = req.params;
        const comments = await Comment.find({ postId })
            .populate("userId", "username tick avatar")
            .skip(perPage * page - perPage) // 
            .limit(perPage)
            .sort({ createdAt: -1 });
        const result = comments.map((comment) => {
            const { userId, ...others } = comment._doc;
            return {
                ...others,
                user: userId,
            };
        });

        const count = await Comment.count();
        return {
            data: result,
            total: count,
            totalPages: Math.ceil(count / perPage),
            currentPage: page,
            perPage,
        };
    } catch (error) {
        next(error);
    }
};

// Comment post Id
const comment = async (req, next) => {
    try {
        const { userId } = req.payload;
        const { postId } = req.params;

        const { comment } = req.body;
        const user = await User.findOne({ _id: userId }).select(
            "username tick avatar"
        );
        if (!user) {
            throw next(createError.BadRequest("User does not exist"));
        }
        // Create new comment
        const newComment = new Comment({
            userId,
            postId,
            content: comment,
        });

        const result = await newComment.save();

        // Update comment count 
        const commentId = result.toObject()._id;
        const updateDocPost = { $inc: { commentsCount: 1 } };
        const updateCommentCount = await Post.findByIdAndUpdate(
            { _id: postId },
            updateDocPost,
            { new: true }
        );
        //throw error
        if (!updateCommentCount) {
            await Comment.findByIdAndDelete({ _id: commentId });
            throw next(createError.BadRequest("Post does not exist"));
        }
        return {
            data: {
                _id: commentId,
                user,
                content: comment,
            },
        };
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getComments,
    comment,
};