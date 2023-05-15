const express = require("express");
const router = express.Router();
const verifyToken = require("../../../midlewares/verifyToken");

const { comment, getComments } = require("./controller");

// Get all comment for post Id
router.get("/:postId", verifyToken, getComments);
router.post("/:postId", verifyToken, comment);

module.exports = router;