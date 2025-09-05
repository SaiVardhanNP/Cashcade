import express from "express";
import signup from "../controllers/user/signup.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import signin from "../controllers/user/signin.js";
import update from "../controllers/user/update.js";
import search from "../controllers/user/search.js";

const userRouter = express.Router();

userRouter.post("/signup",signup);

userRouter.post("/signin",signin );

userRouter.put("/", authMiddleware,update);

userRouter.get("/bulk", authMiddleware,search);

export default userRouter;
