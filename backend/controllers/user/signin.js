import { User } from "../../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const signin=async(req,res)=>{
    try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      res.status(409).json({
        msg: "User not found!",
      });
      return;
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.json({
        msg: "Invalid Password!",
      });
      return;
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.json({
      token,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Failed to sign in!",
    });
  }
}

export default signin;