import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productsRoute from "./routes/productsRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// rest object
const app = express();

//configure env
dotenv.config();

//database config
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(path.join(_dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/category", categoryRoutes);

app.use("/api/v1/product", productsRoute);

// //rest api
// app.use("*", function (req, res) {
//   res.sendFile(path.join(_dirname, "./client/build/index.html"));

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// });
//PORT
const PORT = process.env.PORT || 8080;
// run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
