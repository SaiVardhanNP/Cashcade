import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import User from "../db.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

const requiredBody = z.object({
  firstName: z.string().max(40).trim(),
  lastName: z.string().max(40).trim(),
  username: z.string().min(6).trim(),
  password: z
    .string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const body = requiredBody.safeParse(req.body);

    if (!body.success) {
      res.status(400).json({
        message: "Invalid Data Format",
      });
      return;
    }

    const foundUser = await User.findOne({ username: body.data.username });

    if (foundUser) {
      res.status(409).json({
        msg: "User already exists!",
      });
      return;
    }

    const { firstName, lastName, username, password } = body.data;

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "User created successfully!",
    });
  } catch (e) {
    res.status(500).json({
      msg: "Failed to submit data!",
    });
  }
});

userRouter.get("/info", (req, res) => {
  console.log("HIT /api/v1/user/info");

  res.json({
    msg: "Info",
  });
});

userRouter.post("/signin", async (req, res) => {
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
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if (!isPasswordValid) {
      res.json({
        msg: "Invalid Password!",
      });
      return;
    }
    const token = await jwt.sign(
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
});

export default userRouter;
