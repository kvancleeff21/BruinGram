const cloudinary = require("cloudinary");
const configs = require("../configs");

const connect = cloudinary.v2.config({
    cloud_name: configs.cloudinary.cloudName,
    api_key: configs.cloudinary.apiKey,
    api_secret: configs.cloudinary.apiSecret,
    secure: true,
});

const cloudinary_v2 = cloudinary.v2;

module.exports = { connect, cloudinary_v2 };