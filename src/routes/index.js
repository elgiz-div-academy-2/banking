const { Router } = require("express");
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const forgetPasswordRouter = require("./forgetPassword.router");

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/forget_password", forgetPasswordRouter);

module.exports = router;
