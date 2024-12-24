const User = require("../models/User.model");
const { UnauthorizedError } = require("../utiils/error.utils");
const { decodePayload } = require("../utiils/jwt.utils");

const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization || "";
  token = token.split(" ")[1];

  if (!token) return next(new UnauthorizedError());

  let payload = decodePayload(token);

  if (!payload?.userId) return next(new UnauthorizedError());

  let user = await User.findOne({ where: { id: payload.userId } });

  if (!user) return next(new UnauthorizedError());

  req.user = user;

  next();
};

module.exports = authMiddleware;
