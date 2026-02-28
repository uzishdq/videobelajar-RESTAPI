import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoryRouter from "./routes/category.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

dotenv.config({
  quiet: true,
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Videobelajar Backend is Running 🚀");
});

app.listen(PORT, () => {
  console.log(`server run on PORT : ${PORT}`);
});
