import { Router } from "express";
import authController from "../controllers/authController.js";
import { authMiddleware } from "../middelwares/authMiddleware.js";
import { validationSchemaMiddleware } from "../middelwares/validationSchemaMiddleware.js";
import CreateUser from "../schemas/Validation/CreateUser.js";
import authUser from "../schemas/Validation/AuthUser.js";

const authRouter = Router();

authRouter.post("/signup", validationSchemaMiddleware(CreateUser) ,authController.signup);
authRouter.post("/signin", validationSchemaMiddleware(authUser) ,authController.signin);
authRouter.get("/me", authMiddleware, authController.userLogged);

export default authRouter;