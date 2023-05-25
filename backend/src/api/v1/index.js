const router = require("express").Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const postRouter = require("./post");
const postReactionRouter = require("./postReaction");
const commentRouter = require("./comment");

router.use(authRouter);
router.use(userRouter);
router.use(postRouter);
router.use(postReactionRouter);
router.use(commentRouter);
module.exports = router;

//app.use(require("./api/v1/auth"));