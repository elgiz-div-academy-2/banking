const { z } = require("zod");

const create = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const resetPassword = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  repeatPassword: z.string().min(6),
});

const userValidation = {
  create,
  resetPassword,
};

module.exports = userValidation;
