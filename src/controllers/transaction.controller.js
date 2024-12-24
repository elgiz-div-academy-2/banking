const transactionService = require("../services/transaction.service");

const userTransactions = async (req, res, next) => {
  try {
    let result = await transactionService.transactionsByUser(req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    let result = await transactionService.createTransaction(
      req.user.id,
      req.body
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const transactionController = {
  userTransactions,
  createTransaction,
};

module.exports = transactionController;
