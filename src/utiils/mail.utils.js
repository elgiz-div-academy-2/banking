const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

const sendMail = (from, to, subject, content) => {
  try {
    let result = transporter.sendMail({
      from,
      to,
      subject,
      html: content,
    });

    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  sendMail,
};
