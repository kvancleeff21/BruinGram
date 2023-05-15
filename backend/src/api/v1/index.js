const router = require("express").Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const postRouter = require("./post");
const postReactionRouter = require("./postReaction");
const commentRouter = require("./comment");

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/post-reaction", postReactionRouter);
router.use("/api/comment", commentRouter);
module.exports = router;