const jwt = require("jsonwebtoken");
const KEY = "MYSECRETTOKEN";
const sign = async (data) => {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: "1d",
        };
        jwt.sign(data, KEY, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

const verify = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, KEY, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

module.exports = {
    sign,
    verify,
};