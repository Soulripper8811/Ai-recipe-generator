import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    diet: {
      type: String,
      required: true,
    },
    meal: {
      type: String,
      required: true,
    },
    spicy: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
