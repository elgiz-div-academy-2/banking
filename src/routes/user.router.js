const { Router } = require("express");
const userController = require("../controllers/user.controller");
const userValidation = require("../validations/user.validation");
const validationMiddleware = require("../middlewares/validation.middleware");

const userRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - fullName
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The hashed password of the user (not returned in response)
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         phone:
 *           type: string
 *           nullable: true
 *           description: The phone number of the user (nullable)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated
 *     UserList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/User'
 *
 * /api/users:
 *   get:
 *     tags:
 *      - User
 *     summary: Get a list of all users
 *     description: Returns a list of all registered users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserList'
 */
userRouter.get("/", userController.list);

userRouter.post(
  "/",
  validationMiddleware(userValidation.create),
  userController.create
);

module.exports = userRouter;
