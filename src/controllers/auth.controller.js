const authService = require("../services/auth.service");

const login = async (req, res, next) => {
  try {
    let result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const register = async (req, res, next) => {
  try {
    let result = await authService.register(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const authController = {
  login,
  register,
};

module.exports = authController;
