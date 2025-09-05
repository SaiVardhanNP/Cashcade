import mongoose from "mongoose";
import { Account } from "../../db.js";

const transfer = async (req, res) => {
  const session = await mongoose.startSession();

  try {
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
        $inc: { balance: amount },
      }
    ).session(session);

    await session.commitTransaction();

    res.json({
      msg: "Amount transferred successfully!",
    });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

export default transfer;
