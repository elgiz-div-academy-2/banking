const { Router } = require("express");
const transactionController = require("../controllers/transaction.controller");
const transactionValidation = require("../validations/transaction.validation");
const validationMiddleware = require("../middlewares/validation.middleware");

const transactionRouter = Router();

transactionRouter.get("/", transactionController.userTransactions);
transactionRouter.post(
  "/",
  validationMiddleware(transactionValidation.create),
  transactionController.createTransaction
);

module.exports = transactionRouter;
