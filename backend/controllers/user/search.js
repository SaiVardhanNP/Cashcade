import { User } from "../../db.js";

const search=async(req,res)=>{
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
}

export default search;