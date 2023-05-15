const express = require("express");
const router = express.Router();
const verifyToken = require("../../../midlewares/verifyToken");
const { reaction, getAllUserReactPost } = require("./controller");

router.post("/:postId", verifyToken, reaction);
router.get("/:postId", verifyToken, getAllUserReactPost);

module.exports = router;