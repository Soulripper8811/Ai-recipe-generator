import { userContext } from "@/contexts/UserContext";
import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome, {user.name || user.email} 👋
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Instantly generate delicious, AI-powered recipes tailored to your
          tastes.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => navigate("/create")}
            className="px-6 py-3 text-lg"
          >
            Generate a Recipe
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 text-lg"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
