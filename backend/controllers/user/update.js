import bcrypt from "bcryptjs";
import { User } from "../../db.js";
import { z } from "zod";

const updatedBody = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  password: z
    .string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    .optional(),
}); 

const update=async(req,res)=>{
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
}

export default update;