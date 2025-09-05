import { Account } from "../../db.js";

const balance=async(req,res)=>{
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
}

export default balance;