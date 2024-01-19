import { Router } from "express";
import transactionController from "../controllers/transactionController.js";
import { authMiddleware } from "../middelwares/authMiddleware.js";
import { CreateTransaction } from "../schemas/Validation/CreateTransaction.js";

const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.post("/transactions", validationSchemaMiddleware(CreateTransaction) ,transactionController.create);

transactionRouter.get('/transactions', transactionController.findAllByUser);

export default transactionRouter;