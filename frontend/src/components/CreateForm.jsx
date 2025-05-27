import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { Navigate, useNavigate } from "react-router";

const CreateForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState({
    recipeName: "",
    cuisine: "",
    diet: "",
    meal: "",
    spicy: "",
    skill: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, val) => {
    setValue({ ...value, [field]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      value.recipeName.trim() === "" ||
      !value.cuisine ||
      !value.diet ||
      !value.meal ||
      !value.spicy ||
      !value.skill
    ) {
      toast.error("All fields are required");
      return;
    }
    console.log("Recipe Form Submitted:", value);
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/recipes", value);
      if (response.data.success) {
        toast.success("Recipe generated successfully!");
        setValue({
          recipeName: "",
          cuisine: "",
          diet: "",
          meal: "",
          spicy: "",
          skill: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to generate recipe");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleReset = () => {
    setValue({
      recipeName: "",
      cuisine: "",
      diet: "",
      meal: "",
      spicy: "",
      skill: "",
    });
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-10 overflow-y-auto">
      <Card className="w-full max-w-2xl rounded-3xl shadow-xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 text-center">
            🍽 Create a New Recipe
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            <div className="space-y-1">
              <Label htmlFor="name">Recipe Name</Label>
              <Input
                id="recipeName"
                name="recipeName"
                value={value.name}
                onChange={handleChange}
                placeholder="Ex: Creamy Garlic Pasta"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="cuisine">Cuisine Type</Label>
              <Select
                value={value.cuisine}
                onValueChange={(val) => handleSelectChange("cuisine", val)}
              >
                <SelectTrigger id="cuisine" className="w-full">
                  <SelectValue placeholder="Select Cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="diet">Diet Preference</Label>
              <Select
                value={value.diet}
                onValueChange={(val) => handleSelectChange("diet", val)}
              >
                <SelectTrigger id="diet" className="w-full">
                  <SelectValue placeholder="Select Diet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="no-sugar">No Sugar</SelectItem>
                  <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="meal">Meal Type</Label>
              <Select
                value={value.meal}
                onValueChange={(val) => handleSelectChange("meal", val)}
              >
                <SelectTrigger id="meal" className="w-full">
                  <SelectValue placeholder="Select Meal Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Prep Time */}
            <div className="space-y-1">
              <Label htmlFor="spicy">SpicyNess</Label>
              <Select
                value={value.time}
                onValueChange={(val) => handleSelectChange("spicy", val)}
              >
                <SelectTrigger id="spicy" className="w-full">
                  <SelectValue placeholder="Select Spcicy Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-spicy">Too Spicy</SelectItem>
                  <SelectItem value="spicy">Spicy</SelectItem>
                  <SelectItem value="no-spicy">Not Spicy</SelectItem>
                  <SelectItem value="little-spicy">Little</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skill Level */}
            <div className="space-y-1">
              <Label htmlFor="skill">Skill Level</Label>
              <Select
                value={value.skill}
                onValueChange={(val) => handleSelectChange("skill", val)}
              >
                <SelectTrigger id="skill" className="w-full">
                  <SelectValue placeholder="Select Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end px-6 pb-6 gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={handleReset}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Generating..." : "Generate Recipe"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateForm;
