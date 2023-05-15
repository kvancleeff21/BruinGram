const PostReaction = require("../../../model/PostReaction");
const Post = require("../../../model/Post");

// Like and Unlike
const reaction = async (req, next) => {
    try {
        const { userId } = req.payload;
        const { postId } = req.params;
        const isPost = await Post.findOne({ _id: postId });
        if (!isPost) {
            throw next(createError.BadRequest("Post is not exists"));
        }
       
        const isExits = await PostReaction.findOne({
            postId,
            userId,
        });
       
        if (isExits) {
            const deleteId = isExits.toObject()._id;
            await PostReaction.findByIdAndDelete({
                _id: deleteId,
            });
            const updateDoc = { $inc: { likesCount: -1 } };

            const result = await Post.findByIdAndUpdate({ _id: postId },updateDoc, {new: true});
            return { data: { ...result._doc, isReaction: false } };
        }
        //Chưa thì like
        const newReaction = new PostReaction({
            userId,
            postId,
        });
        const updateDoc = { $inc: { likesCount: 1 } };

        await newReaction.save();
        const result = await Post.findByIdAndUpdate({ _id: postId }, updateDoc, {new: true});

        return { data: { ...result._doc, isReaction: true } };
    } catch (error) {
        next(error);
    }
};

const getAllUserReactPost = async (req, next) => {
    // const { userId } = req.payload;
    try {
        const perPage = req.query.perPage || 10; 
        const page = req.query.page || 1;
        const { postId } = req.params;
        const posts = await PostReaction.find({ postId })
            .populate("userId", "nickname tick avatar")
            .skip(perPage * page - perPage) 
            .limit(perPage);

        const result = posts.map((post) => {
            const { userId, ...others } = post._doc;
            return {
                ...others,
                user: userId,
            };
        });
        return {
            data: result,
            totalPages: Math.ceil(result.length / perPage),
            currentPage: page,
            perPage,
        };
    } catch (error) {
        next(error);
    }
};

module.exports = { reaction, getAllUserReactPost };