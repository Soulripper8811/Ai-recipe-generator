// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node
import dotnev from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotnev.config();

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export const config = {
  responseMimeType: "text/plain",
};
export const model = "gemma-3n-e4b-it";
export const contents = [
  {
    role: "user",
    parts: [
      {
        text: `Generate a detailed recipe based on where recipeName:Meri Recipe, basically this is the user name which user provide ,cuisine:indian,diet:vegetarian,meal:dinner,spicy:too spicy,skills:beginner and provide me the recipe containing the output as json with the filed like RecipeName:userwhich user provide, title by yourself,ingredient it should be in markdown text,description,instruction,time and tags in array of strings.
`,
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: `\`\`\`json
{
  "RecipeName": "Meri Recipe",
  "title": "Fiery Beginner's Chickpea Inferno (Atyant Pikant Chole)",
  "description": "This is 'Meri Recipe' – a straightforward yet intensely spicy Indian chickpea curry, perfect for a vegetarian dinner. Designed for beginners, this dish packs a serious punch for those who crave extreme heat. We're not kidding about the 'too spicy' part, so proceed with delicious caution! It's a flavorful journey into the heart of Indian spices, guaranteed to warm you up.",
  "time": {
    "prep_time": "15 minutes",
    "cook_time": "30 minutes",
    "total_time": "45 minutes"
  },
  "ingredient": [
    "### Main Ingredients:",
    "*   2 tbsp Vegetable Oil (or Ghee for richer flavor)",
    "*   1 large Onion, finely chopped",
    "*   1 tbsp Ginger-Garlic Paste (freshly made or store-bought)",
    "*   2-3 Green Chilies, slit lengthwise (for moderate spice, use 4-6 very hot green chilies like Bird's Eye, finely chopped with seeds, for **TOO SPICY**)",
    "*   1 large Tomato, finely chopped (or 1/2 cup tomato puree)",
    "*   1 (15-ounce / 400g) can Chickpeas, drained and rinsed (reserve the liquid from the can)",
    "",
    "### Spice Powders (The Heat Brigade!):",
    "*   1 tsp Cumin Seeds",
    "*   1/2 tsp Turmeric Powder",
    "*   **2-3 tsp Hot Red Chili Powder** (e.g., Cayenne, Guntur Sannam, or any hot Indian chili powder. This is where the 'too spicy' comes from. Adjust slightly if you are sensitive, but we're aiming high!)",
    "*   1.5 tsp Coriander Powder",
    "*   1/2 tsp Cumin Powder (roasted, if possible)",
    "*   1/2 - 1 tsp Garam Masala (add more at the end for extra warmth and spice)",
    "*   1/4 tsp Black Pepper Powder (optional, for an extra layer of heat)",
    "*   Salt to taste",
    "",
    "### For Finishing:",
    "*   1/2 cup Water (or the reserved chickpea liquid, or more as needed for desired consistency)",
    "*   1 tbsp Lemon Juice (freshly squeezed)",
    "*   2 tbsp Fresh Cilantro (Coriander leaves), chopped, for garnish",
    "",
    "### Optional for EXTRA FIERY KICK:",
    "*   1/4 tsp Asafoetida (Hing) - add with cumin seeds",
    "*   1-2 Dried Red Chilies, broken into pieces - add with cumin seeds"
  ],
  "instruction": [
    "**1. Sauté Aromatics:**",
    "   *   Heat oil in a medium-sized pot or deep pan over medium heat.",
    "   *   Once the oil is hot, add cumin seeds (and dried red chilies/asafoetida if using). Let them splutter for about 30 seconds until fragrant.",
    "   *   Add the finely chopped onions and sauté until they turn translucent and light golden brown (about 5-7 minutes). Stir occasionally to prevent burning.",
    "",
    "**2. Build the Spice Base:**",
    "   *   Add the ginger-garlic paste and the slit/chopped green chilies. Sauté for another 1-2 minutes until the raw smell of ginger and garlic disappears.",
    "   *   Add the chopped tomatoes (or tomato puree). Cook for 3-5 minutes, stirring frequently, until the tomatoes soften and oil starts to separate from the mixture.",
    "",
    "**3. Introduce the Heat Brigade:**",
    "   *   Reduce the heat to low. Add turmeric powder, **HOT red chili powder**, coriander powder, and cumin powder.",
    "   *   Stir well and cook for 1-2 minutes, allowing the spices to roast slightly. Be careful not to burn them; add a splash of water if the mixture seems too dry.",
    "",
    "**4. Add Chickpeas and Simmer:**",
    "   *   Add the drained and rinsed chickpeas to the pot. Stir gently to coat them well with the spice masala.",
    "   *   Pour in 1/2 cup of water (or the reserved chickpea liquid). Add salt to taste and black pepper powder (if using).",
    "   *   Bring the curry to a gentle simmer. Cover the pot and let it cook on low to medium-low heat for 10-15 minutes, allowing the flavors to meld. Stir occasionally.",
    "   *   If the curry becomes too thick, add a little more water until you reach your desired consistency.",
    "",
    "**5. Finish and Serve:**",
    "   *   Once the chickpeas are tender and the gravy has thickened to your liking, stir in the garam masala and freshly squeezed lemon juice.",
    "   *   Taste and adjust salt or chili powder if you dare to make it even spicier (though it should be plenty hot!).",
    "   *   Garnish generously with fresh chopped cilantro.",
    "   *   Serve your 'Fiery Beginner's Chickpea Inferno' hot with rice, roti, naan, or bread."
  ],
  "tags": [
    "Indian",
    "Vegetarian",
    "Dinner",
    "Too Spicy",
    "Spicy",
    "Beginner Friendly",
    "Chickpea Curry",
    "Chole",
    "Quick Meal",
    "High Protein",
    "Gluten-Free (ensure asafoetida is GF if used)"
  ]
}
\`\`\``,
      },
    ],
  },
];

const Aimodel = await ai.models.generateContentStream({
  model,
  config,
  contents,
});

const AIPrompt = `Generate a detailed recipe based on where recipeName:Meri Recipe, basically this is the user name which user provide ,cuisine:indian,diet:vegetarian,meal:dinner,spicy:too spicy,skills:beginner and provide me the recipe containing the output as json with the filed like RecipeName:userwhich user provide, title by yourself,ingredient it should be in markdown text,description,instruction,time and tags in array of strings.`;
