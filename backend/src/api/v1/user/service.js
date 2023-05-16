const { ObjectId } = require("mongodb");
const User = require("../../../model/User");
const Follow = require("../../../model/Follow");
const createError = require("http-errors");
const search = async (req, res, next) => {
    try {
        const { q, type } = req.query;

        const result = await User.find({
            username: new RegExp(q, "i"),
        }).select("-password");
        return result;
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, next) => {
    try {
        const { userId } = req.payload;
        const { username } = req.params;
        const user = await User.findOne({ username }).select("-password");
        const result = await Follow.findOne({
            followId: user.toObject()._id.toString(),
            userId,
        });

        if (user.toObject()._id.toString() === userId) {
            return {
                data: {
                    ...user._doc,
                    isMe: true,
                    isFollow: result ? true : false,
                },
            };
        }
        return {
            data: {
                ...user._doc,
                isMe: false,
                isFollow: result ? true : false,
            },
        };
    } catch (error) {
        next(error);
    }
};

//Tìm những người mình theo dõi
const getFollowing = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { userId: currentUser } = req.payload;
        const perPage = req.query.perPage || 10; // số lượng sản phẩm xuất hiện trên 1 page
        const page = req.query.page || 1;
        const count = await Follow.find({ userId }).count();
        console.log({ userId }), console.log({ currentUser });
        if (userId !== currentUser) {
            const result = await Follow.find({ userId })
                .select("followId")
                .populate("followId", "-password")
                .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(perPage);

            const newResult = await Promise.all(
                result.map(async (data) => {
                    const isFollow = await Follow.findOne({
                        userId: currentUser,
                        followId: data.followId._id,
                    });
                    return {
                        ...data.followId._doc,
                        isFollow: isFollow ? true : false,
                        isMe:
                            currentUser === data.followId._id.toString() &&
                            true,
                    };
                })
            );
            return {
                data: newResult,
                perPage,
                total: count,
                currentPage: page,
                totalPages: Math.ceil(count / perPage),
            };
        }
        const result = await Follow.find({ userId })
            .select("followId")
            .populate("followId", "-password")
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage);

        const newResult = result.map((data) => data.followId);

        return {
            data: newResult,
            perPage,
            total: count,
            currentPage: page,
            totalPages: Math.ceil(count / perPage),
        };
    } catch (error) {
        next(error);
    }
};

//Tìm những người follow mình
const getFollower = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { userId: currentUser } = req.payload;

        const perPage = req.query.perPage || 10; // số lượng sản phẩm xuất hiện trên 1 page
        const page = req.query.page || 1;

        const count = await Follow.find({ followId: userId }).count();
        if (userId !== currentUser) {
            const result = await Follow.find({ followId: userId })
                .select("userId")
                .populate("userId", "-password")
                .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(perPage);

            const newResult = await Promise.all(
                result.map(async (data) => {
                    const isFollow = await Follow.findOne({
                        followId: data.userId._id,
                        userId: currentUser,
                    });
                    return {
                        ...data.userId._doc,
                        isFollow: isFollow ? true : false,
                        isMe:
                            currentUser === data.userId._id.toString() && true,
                    };
                })
            );

            return {
                data: newResult,
                total: count,
                perPage,
                currentPage: page,
                totalPages: Math.ceil(count / perPage),
            };
        }

        const result = await Follow.find({ followId: userId })
            .select("userId")
            .populate("userId", "-password")
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage);

        const newResult = result.map((data) => data.userId);

        return {
            data: newResult,
            total: count,
            perPage,
            currentPage: page,
            totalPages: Math.ceil(count / perPage),
        };
    } catch (error) {
        next(error);
    }
};

const follow = async (req, res, next) => {
    try {
        const { userId } = req.payload;
        const { followId } = req.params;
        if (followId === userId) {
            throw next(createError.BadRequest("Can not follow yourself"));
        }
        const isUser = await User.findOne({ _id: followId });
        if (!isUser) {
            throw next(createError.BadRequest("User is not exists"));
        }

        const isExits = await Follow.findOne({
            followId,
            userId,
        });

        if (isExits) {
            throw next(createError.BadRequest("User is followed"));
        }
        const newFollow = new Follow({
            userId,
            followId,
        });

        await newFollow.save();
        const updateDocFollower = { $inc: { followersCount: 1 } };
        const updateDocFollowing = { $inc: { followingsCount: 1 } };
        await User.findByIdAndUpdate({ _id: userId }, updateDocFollowing);
        await User.findByIdAndUpdate({ _id: followId }, updateDocFollower);

        return {
            data: newFollow,
        };
    } catch (error) {
        next(error);
    }
};

const unfollow = async (req, res, next) => {
    try {
        const { userId } = req.payload;
        const { followId } = req.params;
        if (followId === userId) {
            throw next(createError.BadRequest("Can not unfollow yourself"));
        }
        const isUser = await User.findOne({ _id: followId });
        if (!isUser) {
            throw next(createError.BadRequest("User is not existsf"));
        }
        const isExits = await Follow.findOne({
            followId,
            userId,
        });
        if (isExits) {
            const deleteId = isExits.toObject()._id;
            const result = await Follow.findByIdAndDelete({
                _id: deleteId,
            });
            const updateDocFollower = { $inc: { followersCount: -1 } };
            const updateDocFollowing = { $inc: { followingsCount: -1 } };

            await User.findByIdAndUpdate({ _id: userId }, updateDocFollowing),
                await User.findByIdAndUpdate(
                    { _id: followId },
                    updateDocFollower
                );
            return {
                data: result,
            };
        }
    } catch (error) {
        next(error);
    }
};
module.exports = {
    search,
    getUser,
    getFollowing,
    getFollower,
    follow,
    unfollow,
};