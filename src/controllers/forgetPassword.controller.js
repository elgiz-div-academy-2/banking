const forgetPasswordService = require("../services/forgetPassword.service");

const createForgetPasswordToken = async (req, res, next) => {
  try {
    let result = await forgetPasswordService.createForgetPasswordToken(
      req.body.email
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const confirmPassword = async (req, res, next) => {
  try {
    let result = await forgetPasswordService.confirmPassword(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const forgetPasswordController = {
  createForgetPasswordToken,
  confirmPassword,
};

module.exports = forgetPasswordController;
