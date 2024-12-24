const { Router } = require("express");
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const forgetPasswordRouter = require("./forgetPassword.router");
const authMiddleware = require("../middlewares/auth.middleware");
const transactionRouter = require("./transaction.router");

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/forget_password", forgetPasswordRouter);
router.use("/transactions", authMiddleware, transactionRouter);

module.exports = router;
