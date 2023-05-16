const configs = require("../configs/");
const connectMongoDB = require("./mongoose");
const cloudinary = require("./cloudinary");
const logger = require("../utils/logger");

module.exports = async () => {
    if (configs.mongodb.uri) {
        await connectMongoDB();
    }
    if (configs.cloudinary.cloudName) {
        cloudinary.connect;
        logger.info(
            `Successfully connected to Cloudinary: ${cloudinary.connect.cloud_name}`
        );
        console.log(
            `Successfully connected to Cloudinary: ${cloudinary.connect.cloud_name}`
        );
    }
};