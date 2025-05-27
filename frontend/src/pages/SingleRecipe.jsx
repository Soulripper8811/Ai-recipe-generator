import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

const SingleRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/recipes/${id}`);
      if (response.data.success) {
        setRecipe(null);
        navigate("/dashboard");
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to delete recipe");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axiosInstance.get(`/recipes/${id}`);
        setRecipe(data.recipe);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-16 text-xl font-medium text-gray-600">
        Loading...
      </div>
    );

  if (!recipe)
    return (
      <div className="text-center mt-16 text-red-500 text-xl font-semibold">
        Recipe not found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-10 animate-fade-in">
      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4 text-center">
            {recipe.recipeName}
          </h1>
          <div>
            <Button
              onClick={() => handleDelete(recipe._id)}
              className={"cursor-pointer"}
            >
              Delete
            </Button>
          </div>
        </div>

        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.recipeName}
            className="w-full max-h-[400px] object-cover rounded-xl shadow-lg"
          />
        )}
      </div>

      <section className="bg-white shadow-md p-6 rounded-xl flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          🍽️ Description
        </h2>
        <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
      </section>

      <section className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          🧂 Ingredients
        </h2>
        <div className="prose max-w-none text-gray-700">
          <Markdown>
            {recipe.ingredients.map((item) => `- ${item}`).join("\n")}
          </Markdown>
        </div>
      </section>

      <section className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          👨‍🍳 Instructions
        </h2>
        <div className="prose max-w-none text-gray-700">
          <Markdown>
            {recipe.instructions
              .map((step, idx) => `${idx + 1}. ${step}`)
              .join("\n")}
          </Markdown>
        </div>
      </section>

      <section className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🏷️ Tags</h2>
        <div className="flex flex-wrap gap-2">
          {[
            recipe.cuisine,
            recipe.diet,
            recipe.meal,
            recipe.spicy,
            recipe.skill,
          ].map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SingleRecipe;
