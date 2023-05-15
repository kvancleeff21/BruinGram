const service = require("./service");
const { ApiResponse, Pagination } = require("../../../utils/apiResponse");
const getComments = async (req, res, next) => {
    const result = await service.getComments(req, next);
    const pagination = new Pagination(
        result.perPage,
        result.currentPage,
        result.totalPages
    );
    if (result) new ApiResponse(result.data, { pagination }).send(res);
};
const comment = async (req, res, next) => {
    const result = await service.comment(req, next);
    if (result) new ApiResponse(result.data).send(res);
};
module.exports = {
    getComments,
    comment,
};