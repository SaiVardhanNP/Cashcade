import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import balance from "../controllers/account/balance.js";
import transfer from "../controllers/account/transfer.js";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware,balance);

accountRouter.post("/transfer", authMiddleware, transfer);

export default accountRouter;
