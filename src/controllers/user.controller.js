const userService = require("../services/user.service");

const list = async (req, res, next) => {
  let users = await userService.list();

  res.json(users);
};

const create = async (req, res, next) => {
  try {
    let result = await userService.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
    // /next(err);
  }
};

const userController = {
  list,
  create,
};

module.exports = userController;
