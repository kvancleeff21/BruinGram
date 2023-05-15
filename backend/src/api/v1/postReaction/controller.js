const service = require("./service");
const { ApiResponse, Pagination } = require("../../../utils/apiResponse");

const reaction = async (req, res, next) => {
    const result = await service.reaction(req, next);
    if (result) new ApiResponse(result.data).send(res);
};

// Get post's reaction (get users reaction post)
const getAllUserReactPost = async (req, res, next) => {
    const result = await service.getAllUserReactPost(req, next);
    if (result) {
        const pagination = new Pagination(
            result.perPage,
            result.currentPage,
            result.totalPages
        );
        return new ApiResponse(result.data, { pagination }).send(res);
    }
};
module.exports = {
    reaction,
    getAllUserReactPost,
};