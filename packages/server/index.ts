import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import router from "./routes";

dotenv.config({
  quiet: true,
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port`, PORT);
});
