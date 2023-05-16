const multer = require("multer");

const fileFilter = (request, file, callback) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        console.log("true", file.mimetype);
        callback(null, true);
    } else {
        console.log("false", file.mimetype);
        callback(new Error("File must be .png .jpg .jpeg"), false);
    }
};

const upload = multer({ dest: "uploads/", fileFilter: fileFilter });

module.exports = { upload };