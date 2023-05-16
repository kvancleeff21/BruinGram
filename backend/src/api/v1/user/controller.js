const service = require("./service");
const { ApiResponse, Pagination } = require("../../../utils/apiResponse");

const search = async (req, res, next) => {
    const users = await service.search(req, res, next);
    res.json({ data: users });
};

const getUser = async (req, res, next) => {
    const result = await service.getUser(req, next);
    if (result) new ApiResponse(result.data).send(res);
};
const getFollowing = async (req, res, next) => {
    const result = await service.getFollowing(req, res, next);
    const pagination = new Pagination(
        result.perPage,
        result.currentPage,
        result.totalPages,
        result.total
    );
    if (result) new ApiResponse(result.data, { pagination }).send(res);
};
const getFollower = async (req, res, next) => {
    const result = await service.getFollower(req, res, next);
    const pagination = new Pagination(
        result.perPage,
        result.currentPage,
        result.totalPages,
        result.total
    );
    if (result) new ApiResponse(result.data, { pagination }).send(res);
};
const follow = async (req, res, next) => {
    const result = await service.follow(req, res, next);
    if (result) new ApiResponse(result.data).send(res);
};

const unfollow = async (req, res, next) => {
    const result = await service.unfollow(req, res, next);
    if (result) new ApiResponse(result.data).send(res);
};
module.exports = {
    search,
    getUser,
    getFollowing,
    getFollower,
    follow,
    unfollow,
};