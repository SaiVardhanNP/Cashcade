import { User } from "../../db.js";
import bcrypt from "bcryptjs";
import { z } from "zod";



const requiredBody = z.object({
  firstName: z.string().max(40).trim(),
  lastName: z.string().max(40).trim(),
  username: z.string().min(6).trim(),
  password: z
    .string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
});

const signup = async (req, res) => {
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
      userId: user._id,
      balance: Math.floor(Math.random() * 1000) + 1,
    });

    res.status(201).json({
      msg: "User created successfully!",
    });
  } catch (e) {
    res.status(500).json({
      msg: "Failed to submit data!",
    });
  }
};


export default signup;