import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

const bankSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  balance: Number,
});

export const User = mongoose.model("users", userSchema);
export const Account = mongoose.model("accounts", bankSchema);
