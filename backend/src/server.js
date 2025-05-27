import express from "express";
import dotnev from "dotenv";
import userRoutes from "./routes/user.route.js";
import recipeRoutes from "./routes/recipe.route.js";
import errorHandler from "./middleware/errormiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotnev.config();
const __dirname = path.resolve();
const app = express();

const PORT = process.env.PORT || 5001;

//midddlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

//error midlleware
app.use(errorHandler);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use(express.static(path.join(__dirname, "../frontend/dist")));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
