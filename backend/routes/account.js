import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { Account } from "../db.js";
import mongoose from "mongoose";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Reached!");

    const account = await Account.findOne({
      userId: userId,
    });

    if (!account) return res.status(404).json({ msg: "Account not found!" });
    res.json({
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;
  console.log(req.userId);

  const account = await Account.findOne({ userId: req.userId });
    console.log(account);
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.json({
      msg: "Account not found!",
    });
    return;
  }
  const toAccount = await Account.findOne({ userId: to });
  if (!toAccount) {
    await session.abortTransaction();
    res.json({
      msg: "Recipient account is not found!",
    });
    return;
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: { balance: -amount },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {balance: amount },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    msg:"Amount transferred successfully!"
  })
});

export default accountRouter;
