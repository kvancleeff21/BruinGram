const jwt = require("../helpers/jsonwebtoken");
const createError = require("http-errors");

const verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    const token = authHeader && authHeader.split(" ")[1];
    if (!token || token === "undefined") {
        return next(new createError.Unauthorized());
    }

    try {
        const verify = await jwt.verify(token);
        if (verify) {
            if (verify.error) {
                throw next(new createError.Unauthorized(verify.error.message));
            }
            req.payload = verify;
        }
    } catch (error) {
        next(error);
    }

    next();
};

module.exports = verifyToken;