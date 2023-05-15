const service = require("./service");
const { ApiResponse, Pagination } = require("../../../utils/apiResponse");

const getPosts = async (req, res, next) => {
    const result = await service.getPosts(req, next);

    if (result) {
        const pagination = new Pagination(
            result.perPage,
            result.currentPage,
            result.totalPages,
            result.total
        );
        return new ApiResponse(result.data, { pagination }).send(res);
    }
};

const getPost = async (req, res, next) => {
    const result = await service.getPost(req, next);
    if (result) {
        return new ApiResponse(result.data).send(res);
    }
};

const getPostsOfUser = async (req, res, next) => {
    const result = await service.getPostsOfUser(req, next);
    if (result) {
        const pagination = new Pagination(
            result.perPage,
            result.currentPage,
            result.totalPages,
            result.total
        );
        return new ApiResponse(result.data, { pagination }).send(res);
    }
};

const createPost = async (req, res, next) => {
    const result = await service.createPost(req, next);
    if (result) new ApiResponse(result.data).send(res);
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    getPostsOfUser,
};