import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="h-48 bg-gray-100">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.recipeName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
            No Image Provided
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-indigo-600">
          {recipe.recipeName}
        </h2>
        <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">
          {recipe.description}
        </p>

        <div className="text-xs text-gray-500 mb-2">
          <p>
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <p>
            <strong>Diet:</strong> {recipe.diet}
          </p>
          <p>
            <strong>Meal:</strong> {recipe.meal}
          </p>
          <p>
            <strong>Spicy:</strong> {recipe.spicy}
          </p>
        </div>

        <Link
          to={`/recipe/${recipe._id}`}
          className="mt-2 inline-block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 px-3 rounded-md text-sm transition"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
