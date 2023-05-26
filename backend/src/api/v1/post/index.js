const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");
const multer = require("../../../middlewares/multer");
const {
    getPosts,
    getPost,
    createPost,
    getPostsOfUser,
} = require("./controller");

router.get("/", verifyToken, getPosts);
router.get("/:postId", verifyToken, getPost);
router.get("/user/:username", verifyToken, getPostsOfUser);
router.post("/", verifyToken, multer.upload.array("assets"), createPost);

module.exports = router;