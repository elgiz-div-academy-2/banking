const { z } = require("zod");

const create = z.object({
  type: z.enum(["transfer", "payment", "topup"]),
  to: z.number().optional(),
  amount: z.number().min(1),
});

const transactionValidation = {
  create,
};

module.exports = transactionValidation;
