import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {User} from '../db.js'
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js";
import { Account } from "../db.js";

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

const updatedBody = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  password: z
    .string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    .optional(),
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

    await Account.create({
      userId:user._id,
      balance:Math.floor(Math.random()*1000)+1
    })

    res.status(201).json({
      msg: "User created successfully!",
    });
  } catch (e) {
    res.status(500).json({
      msg: "Failed to submit data!",
    });
  }
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
});

userRouter.put("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { success } = updatedBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        msg: "Invalid Data!",
      });
    }
    const hashedPassword=await bcrypt.hash(req.body.password,5);

    await User.updateOne(
      {
        _id: userId,
      },
      {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:hashedPassword
      }
    );

    res.status(200).json({
      msg: "Data updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: filter,
            $options: "i",
          },
        },
      ],
    });

    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
    });
  } catch (e) {
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
});

export default userRouter;
