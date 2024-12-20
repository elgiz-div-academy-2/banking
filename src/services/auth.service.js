const User = require("../database/User.model");
const bcrypt = require("bcrypt");
const { encodePayload } = require("../utiils/jwt.utils");
const { AppError } = require("../utiils/error.utils");
const renderTemplate = require("../utiils/template.utils");

const fs = require("fs");
const { sendMail } = require("../utiils/mail.utils");
const config = require("../config");

const login = async (params) => {
  let user = await User.findOne({
    where: {
      email: params.email,
    },
  });

  if (!user) throw new AppError("Username or password is wrong", 404);

  let checkPassword = await bcrypt.compare(params.password, user.password);

  if (!checkPassword) throw new AppError("Username or password is wrong", 404);

  let token = encodePayload({ userId: user.id });

  user = user.toJSON();

  return {
    token,
    user: {
      ...user,
      password: undefined,
    },
  };
};

const register = async (params) => {
  let checkUser = await User.findOne({ where: { email: params.email } });
  if (checkUser) throw new AppError("User already exsist", 409);

  let hash = await bcrypt.hash(params.password, 10);

  let user = await User.create({ ...params, password: hash });

  const mailContent = await renderTemplate("welcome-mail", {
    user: user.toJSON(),
    activationLink: "http://localhost.com",
    supportMail: "info@john.com",
  });

  await sendMail(
    config.smtp.from,
    user.email,
    "Welcome to our app",
    mailContent
  );

  return user;
};

const authService = {
  login,
  register,
};

module.exports = authService;
