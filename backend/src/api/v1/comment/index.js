const express = require("express");
const router = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");

const { comment, getComments } = require("./controller");

// Get all comment for post Id
router.get("/comment/:postId", verifyToken, getComments);
router.post("/comment/:postId", verifyToken, comment);

module.exports = router;