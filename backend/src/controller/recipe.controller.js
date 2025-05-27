import { tryCatchWrapper } from "../middleware/utils.js";
import ErrorResponse from "../middleware/ErrorResponse.js";
import Recipe from "../models/recipe.model.js";
import { ai, config, contents, model } from "../config/ai.js";
import dotnev from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotnev.config();

export const generateRecipe = tryCatchWrapper(async (req, res) => {
  const { recipeName, cuisine, diet, meal, spicy, skill } = req.body;
  if (!recipeName || !cuisine || !diet || !meal || !spicy || !skill) {
    throw new ErrorResponse("Please provide all fields", 400);
  }
  const user = req.user;
  const AIPrompt = `Generate a detailed recipe based on where recipeName:${recipeName}, basically this is the user name which user provide ,cuisine:${cuisine},diet:${diet},meal:${meal},spicy:${spicy},skills:${skill} and provide me the recipe containing the output as json with the filed like RecipeName:userwhich user provide, title by yourself,ingredient it should be in markdown text,description,instruction,time and tags in array of strings. And i need eveything`;
  const response = await ai.models.generateContent({
    model: model,
    config: config,
    contents: [
      ...contents,
      {
        role: "user",
        parts: [
          {
            text: AIPrompt,
          },
        ],
      },
    ],
  });
  const client = new InferenceClient("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");

  const imageBlob = await client.textToImage({
    provider: "hf-inference",
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: recipeName,
    parameters: { num_inference_steps: 5 },
  });

  const arrayBuffer = await imageBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const base64Image = buffer.toString("base64");
  if (!base64Image) {
    throw new ErrorResponse("Failed to convert image to base64", 500);
  }
  const imageUrl = `data:image/png;base64,${base64Image}`;
  const data = JSON.parse(
    response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
  if (!data) {
    throw new ErrorResponse("Failed to generate recipe", 500);
  }
  const recipe = await Recipe.create({
    recipeName,
    cuisine,
    diet,
    meal,
    spicy,
    skill,
    ingredients: data?.ingredient || [],
    description: data?.description || "",
    instructions: data?.instruction || [],
    userId: user._id,
    image: imageUrl,
  });
  res.status(200).json({
    success: true,
    recipe,
    message: "Recipe generated successfully",
  });
});

export const getAllRecipes = tryCatchWrapper(async (req, res) => {
  const recipes = await Recipe.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    recipes,
  });
});
export const getSingleRecipe = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new ErrorResponse("Recipe not found", 404);
  } else {
    res.status(200).json({
      success: true,
      recipe,
    });
  }
});

export const deleteRecipe = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findByIdAndDelete(id);
  if (!recipe) {
    throw new ErrorResponse("Recipe not found", 404);
  } else {
    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  }
});

const generateImage = tryCatchWrapper(async ({ name }) => {
  const client = new InferenceClient("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");

  const imageBlob = await client.textToImage({
    provider: "hf-inference",
    model: "stabilityai/stable-diffusion-3.5-large",
    inputs: name,
    parameters: { num_inference_steps: 5 },
  });

  const arrayBuffer = await imageBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const base64Image = buffer.toString("base64");
  if (!base64Image) {
    throw new ErrorResponse("Failed to convert image to base64", 500);
  }

  return `data:image/png;base64,${base64Image}`;
});
