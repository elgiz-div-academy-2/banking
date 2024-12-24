const { User } = require("../models");
const { NotFoundError, AppError } = require("../utiils/error.utils");

const bcrypt = require("bcrypt");

const list = async () => {
  let list = await User.findAll({});

  return list.map((user) => user.toJSON());
};

const create = async (params) => {
  let user = await User.create(params);
  return user;
};

const resetPassword = async (userId, params) => {
  const { currentPassword, newPassword, repeatPassword } = params;

  const user = await User.findOne({ where: { id: userId } });

  if (!user) throw new NotFoundError("User is not found");

  if (newPassword !== repeatPassword) {
    throw new AppError("Repeat password is not equal with new passowrd", 400);
  }

  const checkPassword = await bcrypt.compare(currentPassword, user.password);

  if (!checkPassword) throw new AppError("User password is not correct", 400);

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();
  return {
    message: "User password is successfully updated",
  };
};

const userService = {
  create,
  list,
  resetPassword,
};

module.exports = userService;
