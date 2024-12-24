const { User, ActivationModel } = require("../models");
const { NotFoundError, AppError } = require("../utiils/error.utils");

const dateFns = require("date-fns");

const uuid = require("uuid");
const { sendMail } = require("../utiils/mail.utils");
const config = require("../config");
const renderTemplate = require("../utiils/template.utils");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const createForgetPasswordToken = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new NotFoundError("User with this email is not exists");

  const activationToken = uuid.v4();

  await ActivationModel.create({
    userId: user.id,
    token: activationToken,
    expireDate: dateFns.addMinutes(new Date(), 10),
    type: "resetPassword",
  });

  const content = await renderTemplate("reset-password", {
    user: user.toJSON(),
    websiteUrl: config.appURL,
    activationUrl: `${config.appURL}/api/forget_password?token=${activationToken}`,
  });

  await sendMail(config.smtp.from, user.email, "Reset password", content);

  return {
    message: "activation token is sent",
  };
};

const confirmPassword = async (params) => {
  const activation = await ActivationModel.findOne({
    where: {
      token: params.token,
      expireDate: {
        [Op.gte]: new Date(),
      },
    },
  });

  if (!activation) throw new AppError("Activation token is wrong", 400);

  let user = await User.findOne({ where: { id: activation.userId } });

  if (!user) throw new NotFoundError("User is not found");

  if (params.password !== params.repeatPassword)
    throw new AppError("Passwords are not same", 400);

  user.password = await bcrypt.hash(params.password, 10);

  await user.save();

  await activation.destroy();

  return {
    message: "User password is successsfully updated",
  };
};

const forgetPasswordService = {
  createForgetPasswordToken,
  confirmPassword,
};

module.exports = forgetPasswordService;
