import "dotenv/config";
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import accountRouter from "./routes/account.js";
const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account",accountRouter)

app.get("/", (req, res) => {
  res.json({
    msg: "Hellove From Express!",
  });
});

async function run(){
    const connection=await mongoose.connect(process.env.MONGO_DB_URL);
    // console.log(connection);
    app.listen(PORT, () => console.log("Server running on port", PORT));

    
}

run();
