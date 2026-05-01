/*
  data.js
  -------
  SINGLE RESPONSIBILITY: Be the data layer.
  This file does ONE thing — it holds the data.
  No rendering. No logic. No DOM touching.

  WHY A CONST ARRAY AT THE TOP LEVEL?
  Because it lives on the window object (global scope),
  every other JS file loaded after this one can read RECIPES.
  This is our deliberate, controlled use of global scope.

  FUTURE SWAP: When you integrate the Spoonacular API,
  you'll replace this array with an async fetch call.
  Nothing else in the codebase changes — only this file.

  SHAPE CONSISTENCY: Every object has the exact same keys.
  If you add a recipe, it must have ALL these keys.
  Missing keys cause silent bugs in the render functions.
*/

const RECIPES = [
  {
    id: 1,
    title: "Greek Buddha Bowl",
    description:
      "A vibrant medley of roasted chickpeas, tzatziki, cucumber, olives, and feta over herbed quinoa.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    time: "25 min",
    calories: "420 kcal",
    servings: 2,
    rating: 4.8,
    badge: "🔥 Trending",
    category: "vegan",
    tags: ["Vegan", "Gluten-Free"],
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Truffle Pasta Carbonara",
    description:
      "Classic Roman carbonara elevated with shaved black truffle and aged Pecorino Romano.",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80",
    time: "20 min",
    calories: "680 kcal",
    servings: 2,
    rating: 4.9,
    badge: "⭐ Top Rated",
    category: "comfort",
    tags: ["Italian", "Indulgent"],
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Mango Coconut Chia Pudding",
    description:
      "Creamy overnight chia pudding layered with fresh mango salsa and toasted coconut flakes.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500&q=80",
    time: "10 min",
    calories: "280 kcal",
    servings: 1,
    rating: 4.7,
    badge: "Quick",
    category: "breakfast",
    tags: ["Vegan", "Quick"],
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Spiced Lamb Kofta",
    description:
      "Juicy lamb kofta skewers seasoned with cumin, coriander and fresh herbs, served with tahini.",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80",
    time: "35 min",
    calories: "510 kcal",
    servings: 4,
    rating: 4.6,
    badge: "High-Protein",
    category: "high-protein",
    tags: ["High-Protein", "Grilled"],
    difficulty: "Medium",
  },
  {
    id: 5,
    title: "Avocado Toast Three Ways",
    description:
      "Three gorgeous takes on avocado toast: classic, spicy kimchi, and everything bagel style.",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500&q=80",
    time: "12 min",
    calories: "340 kcal",
    servings: 1,
    rating: 4.5,
    badge: "⚡ Quick",
    category: "quick",
    tags: ["Quick", "Vegetarian"],
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Baklava Cheesecake",
    description:
      "A marriage of creamy vanilla cheesecake and flaky honey-walnut baklava on a buttery pastry base.",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80",
    time: "90 min",
    calories: "520 kcal",
    servings: 12,
    rating: 4.9,
    badge: "Chef's Pick",
    category: "dessert",
    tags: ["Dessert", "Baked"],
    difficulty: "Hard",
  },
];
