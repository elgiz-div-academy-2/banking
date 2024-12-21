const { Router } = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const forgetPasswordValidation = require("../validations/forget_password.validation");
const forgetPasswordController = require("../controllers/forgetPassword.controller");

const forgetPasswordRouter = Router();

forgetPasswordRouter.get("/", (req, res, next) => {
  res.render("forget-password", { layout: false });
});

forgetPasswordRouter.post(
  "/",
  validationMiddleware(forgetPasswordValidation.createForgetPasswordToken),
  forgetPasswordController.createForgetPasswordToken
);

forgetPasswordRouter.post(
  "/confirm",
  validationMiddleware(forgetPasswordValidation.confirmPassword),
  forgetPasswordController.confirmPassword
);

module.exports = forgetPasswordRouter;
