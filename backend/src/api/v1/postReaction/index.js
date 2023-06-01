const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");
const { reaction, getAllUserReactPost } = require("./controller");

router.post("/react/:postId", verifyToken, reaction);
router.get("/react/:postId", verifyToken, getAllUserReactPost);

module.exports = router;