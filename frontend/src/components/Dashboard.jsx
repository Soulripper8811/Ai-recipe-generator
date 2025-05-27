import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RecipeCard from "./RecipeCard";

const Dashboard = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/recipes");
        if (response.data.success) {
          setRecipes(response.data.recipes);
          toast.success("Recipes fetched successfully!");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Failed to fetch recipes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="px-4 py-6 bg-white rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4">
        {recipes &&
          recipes?.length > 0 &&
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        {recipes && recipes?.length === 0 && (
          <div className="col-span-2 md:col-span-4 text-center text-gray-500">
            <p className="text-lg">No recipes found. Start creating!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
