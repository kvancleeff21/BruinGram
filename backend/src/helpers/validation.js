const Joi = require("joi");

const userBodyRegister = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(4).max(32).required(),
    });
    return schema.validate(user);
};

module.exports = { userBodyRegister };