const service = require("./service");
const { ApiResponse } = require("../../../utils/apiResponse");

const login = async (req, res, next) => {
    const result = await service.login(req, res, next);
    if (result) new ApiResponse(result.data, { token: result.token }).send(res);
};

const register = async (req, res, next) => {
    const result = await service.register(req, res, next);
    if (result) new ApiResponse(result.data, { token: result.token }).send(res);
};

const updateCurrentUser = async (req, res, next) => {
    const result = await service.updateCurrentUser(req, res, next);
    if (result) new ApiResponse(result.data).send(res);
};

const getCurrentUser = async (req, res, next) => {
    const result = await service.getCurrentUser(req, res, next);
    if (result) new ApiResponse(result.data).send(res);
};

module.exports = {
    login,
    register,
    updateCurrentUser,
    getCurrentUser,
};