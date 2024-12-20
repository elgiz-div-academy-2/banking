const jwt = require("jsonwebtoken");
const config = require("../config");
const encodePayload = (payload) => {
  const token = jwt.sign(payload, config.jwtSecret);
  return token;
};
const decodePayload = (token) => {
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    return payload;
  } catch (error) {
    return false;
  }
};
module.exports = {
  encodePayload,
  decodePayload,
};
