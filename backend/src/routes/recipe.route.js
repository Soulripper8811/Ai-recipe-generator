import express from "express";
import {
  deleteRecipe,
  generateRecipe,
  getAllRecipes,
  getSingleRecipe,
} from "../controller/recipe.controller.js";
import { authProtection } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", authProtection, generateRecipe);
router.get("/", authProtection, getAllRecipes);
router.get("/:id", authProtection, getSingleRecipe);
router.delete("/:id", authProtection, deleteRecipe);

export default router;
