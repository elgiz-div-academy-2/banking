const { TransactionModel, User } = require("../models");
const { AppError } = require("../utiils/error.utils");

const transactionsByUser = async (userId) => {
  return await TransactionModel.findAll({
    where: { userId },
    include: [
      {
        model: User,
        as: "from",
        attributes: ["id", "email"],
      },
      {
        model: User,
        as: "to",
        attributes: ["id", "email"],
      },
    ],
  });
};

const createTransaction = async (userId, params) => {
  let user = await User.findOne({ where: { id: userId } });

  let body = {
    type: params.type,
    userId,
    status: "success",
    amount: params.amount,
  };

  if (params.type === "transfer") {
    if (!params.to) throw new AppError("Receiver is not defined", 400);
    body.fromId = userId;
    body.toId = params.to;
  }

  let transaction = await user.createTransaction(body);

  if (params.type === "transfer") {
    await TransactionModel.create({ ...body, userId: params.to });
  }

  return transaction;
};

const transactionService = {
  transactionsByUser,
  createTransaction,
};

module.exports = transactionService;
