const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const authValidation = require("../validations/auth.validation");

const authRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user (at least 6 characters)
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user (between 6 to 50 characters)
 *         fullName:
 *           type: string
 *           description: The full name of the user (optional)
 *         phone:
 *           type: string
 *           description: The phone number of the user (optional)
 *     LoginResponse:
 *       type: object
 *       required:
 *         - token
 *         - user
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token or authentication token for the user
 *         user:
 *           $ref: '#/components/schemas/User'
 * /api/auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login a user
 *     description: Authenticates a user with their email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid credentials
 */
authRouter.post(
  "/login",
  validationMiddleware(authValidation.login),
  authController.login
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Register a new user
 *     description: Creates a new user with email, password, optional fullName and phone number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input data
 */
authRouter.post(
  "/register",
  validationMiddleware(authValidation.register),
  authController.register
);

module.exports = authRouter;
