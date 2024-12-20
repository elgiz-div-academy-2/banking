const User = require("../database/User.model");

const list = async () => {
  let list = await User.findAll({});

  return list.map((user) => user.toJSON());
};

const create = async (params) => {
  let user = await User.create(params);
  return user;
};

const userService = {
  create,
  list,
};

module.exports = userService;
