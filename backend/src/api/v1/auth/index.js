const express = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const router = express.Router();
const multer = require("../../../middlewares/multer");

const {
    getCurrentUser,
    login,
    register,
    updateCurrentUser,
} = require("./controller");

router.get("/me", verifyToken, getCurrentUser);
router.post("/login", login);
router.post("/register", register);
router.patch(
    "/me",
    verifyToken,
    multer.upload.single("avatar"),
    updateCurrentUser
);

module.exports = router;