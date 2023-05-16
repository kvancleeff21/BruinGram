const { cloudinary_v2 } = require("../resources/cloudinary");
const randomstring = require("randomstring");
const fs = require("fs");



const upload = async (file) => {
    if (file === undefined) return;

    const randomId = randomstring.generate();

    try {
        const imagesOtions = {
            use_filename: true,
            unique_filename: true,
            overwrite: false,
            public_id: `/images/${randomId}`,
            folder: "instagram-tv",
        };

        return new Promise((resolve, reject) => {
            cloudinary_v2.uploader.upload(
                file.path,
                imagesOtions,
                async (err, result) => {
                    if (err) reject(err);
                    resolve({
                        publicId: result.public_id,
                        url: result.secure_url,
                    });
                    await fs.unlinkSync(file.path);
                }
            );
        });
    } catch (error) {
        await fs.unlinkSync(file.path);
        return error;
    }
};

module.exports = { upload };