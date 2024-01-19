import { Router } from "express";
import transactionController from "../controllers/transactionController.js";
import { authMiddleware } from "../middelwares/authMiddleware.js";

const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.post("/transactions", transactionController.create);

transactionRouter.get('/transactions', transactionController.findAllByUser);

export default transactionRouter;