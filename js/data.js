/*
  data.js
  -------
  SINGLE RESPONSIBILITY: Be the data layer.
  
  NEW FIELDS ADDED:
  - author: fictional author object per recipe
  - summary: longer editorial paragraph
  - cookTime: separate from prepTime for display
  - protein/carbs/fat: for nutrition bar
  - ingredients[]: array of objects with amount, unit, name, substitute
  - steps[]: array of objects with number, instruction
  - video: Youtube embed URL(placeholder for now)

  UNIT CONVENTION:
  All ingredient amounts are stored in METRIC (grams, ml)
  The unit conversion recipe.js converts to imperial when needed.
  Always store in one system, convert on display.
  This called 'canonical storage' - one of truth

  SERVINGS CONVENTION:
  All ingredient amount are for the base servings count.
  dish.js scales them proportionally when servings change




 
*/

const RECIPES = [
  {
    id: 1,
    title: "Greek Buddha Bowl",
    description:
      "A vibrant medley of roasted chickpeas, tzatziki, cucumber, olives, and feta over herbed quinoa.",
    summary:
      "The Buddha Bowl is one of those dishes that looks impossibly beautiful and tastes even better. This Greek-inspired version takes the best of the Mediterranean — briny olives, creamy feta, cooling tzatziki — and layers them over a base of perfectly herbed quinoa. It is the kind of meal that makes you feel genuinely good after eating it. Every component can be prepped ahead, making it perfect for meal prep or a quick weeknight dinner.",
    author: {
      name: "Amara Diallo",
      bio: "Food writer and plant-based cooking advocate based in Cape Town.",
    },
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "25 min",
    prepTime: 15,
    cookTime: 10,
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 14,
    servings: 2,
    rating: 4.8,
    badge: "🔥 Trending",
    category: "vegan",
    cuisine: "mediterranean",
    diet: ["vegan", "vegetarian", "gluten-free"],
    tags: ["Vegan", "Gluten-Free"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 180,
        unit: "g",
        name: "quinoa, rinsed",
        substitute: "Brown rice or couscous work well here",
      },
      {
        amount: 400,
        unit: "g",
        name: "chickpeas, drained and rinsed",
        substitute: "White beans or lentils",
      },
      { amount: 30, unit: "ml", name: "olive oil", substitute: "Avocado oil" },
      {
        amount: 1,
        unit: "tsp",
        name: "smoked paprika",
        substitute: "Regular paprika",
      },
      { amount: 1, unit: "tsp", name: "cumin", substitute: "Coriander" },
      {
        amount: 200,
        unit: "g",
        name: "cucumber, diced",
        substitute: "Zucchini",
      },
      {
        amount: 150,
        unit: "g",
        name: "cherry tomatoes, halved",
        substitute: "Sun-dried tomatoes",
      },
      {
        amount: 80,
        unit: "g",
        name: "kalamata olives",
        substitute: "Green olives",
      },
      {
        amount: 100,
        unit: "g",
        name: "feta cheese, crumbled",
        substitute: "Vegan feta or goat cheese",
      },
      {
        amount: 200,
        unit: "g",
        name: "tzatziki",
        substitute: "Plain yoghurt with lemon and garlic",
      },
      {
        amount: 15,
        unit: "g",
        name: "fresh parsley, chopped",
        substitute: "Fresh mint or dill",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Preheat your oven to 200°C (180°C fan). Line a baking tray with parchment paper.",
      },
      {
        number: 2,
        instruction:
          "Pat the chickpeas completely dry with paper towels — this is the key to getting them crispy. Toss with olive oil, smoked paprika, cumin, salt and pepper.",
      },
      {
        number: 3,
        instruction:
          "Spread chickpeas in a single layer on the tray. Roast for 25-30 minutes, shaking halfway, until golden and crispy.",
      },
      {
        number: 4,
        instruction:
          "While chickpeas roast, cook quinoa. Combine with 360ml water in a saucepan. Bring to a boil, reduce heat, cover and simmer 15 minutes until water is absorbed. Fluff with a fork.",
      },
      {
        number: 5,
        instruction:
          "Divide quinoa between bowls. Arrange cucumber, tomatoes, olives, and feta around the bowl.",
      },
      {
        number: 6,
        instruction:
          "Top with crispy chickpeas and a generous spoonful of tzatziki. Finish with fresh parsley and a drizzle of olive oil.",
      },
    ],
  },
  {
    id: 2,
    title: "Truffle Pasta Carbonara",
    description:
      "Classic Roman carbonara elevated with shaved black truffle and aged Pecorino Romano.",
    summary:
      "True carbonara has no cream. That is the hill every Roman cook will die on. The sauce comes entirely from the emulsification of eggs, Pecorino Romano, and starchy pasta water — a technique that takes ten minutes to learn and a lifetime to perfect. The addition of shaved black truffle here takes it from weeknight comfort food to something genuinely special. Do not skip the pasta water. It is everything.",
    author: {
      name: "Marco Ferretti",
      bio: "Italian-born chef and pasta purist living in Johannesburg.",
    },
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "20 min",
    prepTime: 5,
    cookTime: 15,
    calories: 680,
    protein: 28,
    carbs: 74,
    fat: 32,
    servings: 2,
    rating: 4.9,
    badge: "⭐ Top Rated",
    category: "comfort",
    cuisine: "italian",
    diet: [],
    tags: ["Italian", "Indulgent"],
    difficulty: "medium",
    ingredients: [
      {
        amount: 200,
        unit: "g",
        name: "spaghetti or rigatoni",
        substitute: "Any long or tube pasta",
      },
      {
        amount: 150,
        unit: "g",
        name: "guanciale or pancetta, diced",
        substitute: "Bacon lardons — not traditional but it works",
      },
      {
        amount: 3,
        unit: "whole",
        name: "large eggs",
        substitute: "No substitute — eggs are the sauce",
      },
      {
        amount: 80,
        unit: "g",
        name: "Pecorino Romano, finely grated",
        substitute: "Parmesan — less sharp but acceptable",
      },
      {
        amount: 20,
        unit: "g",
        name: "black truffle, shaved",
        substitute: "Truffle oil — use sparingly, it is stronger",
      },
      {
        amount: 2,
        unit: "cloves",
        name: "garlic",
        substitute: "Omit for a more traditional carbonara",
      },
      {
        amount: 5,
        unit: "g",
        name: "freshly cracked black pepper",
        substitute: "White pepper — different but interesting",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Bring a large pot of heavily salted water to a boil. Cook pasta until al dente (1-2 minutes less than packet says). Reserve 200ml pasta water before draining.",
      },
      {
        number: 2,
        instruction:
          "While pasta cooks, whisk eggs and most of the Pecorino together in a bowl. Add a generous amount of cracked black pepper.",
      },
      {
        number: 3,
        instruction:
          "Fry guanciale in a large pan over medium heat until fat renders and edges crisp, about 8 minutes. Add garlic in the last minute.",
      },
      {
        number: 4,
        instruction:
          "Remove pan from heat — this is critical. Add drained pasta to the pan and toss to coat in the pork fat.",
      },
      {
        number: 5,
        instruction:
          "Add egg mixture and 50ml pasta water. Toss continuously and vigorously — the residual heat cooks the eggs into a glossy sauce. Add more pasta water if needed to reach a silky consistency.",
      },
      {
        number: 6,
        instruction:
          "Plate immediately. Top with remaining Pecorino, shaved truffle, and more black pepper.",
      },
    ],
  },
  {
    id: 3,
    title: "Mango Coconut Chia Pudding",
    description:
      "Creamy overnight chia pudding layered with fresh mango salsa and toasted coconut flakes.",
    summary:
      "Chia seeds are one of those rare ingredients that are both nutritionally extraordinary and genuinely delicious when treated correctly. The secret is the ratio — too little chia and you get liquid, too much and you get gel. This recipe gets it right, then layers the pudding with a bright mango salsa that cuts through the creaminess. Make it the night before and breakfast is done.",
    author: {
      name: "Priya Nair",
      bio: "Nutritionist and recipe developer specialising in plant-based breakfasts.",
    },
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "10 min",
    prepTime: 10,
    cookTime: 0,
    calories: 280,
    protein: 8,
    carbs: 36,
    fat: 12,
    servings: 1,
    rating: 4.7,
    badge: "⚡ Quick",
    category: "breakfast",
    cuisine: "asian",
    diet: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    tags: ["Vegan", "Quick"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 40,
        unit: "g",
        name: "chia seeds",
        substitute: "Flax seeds — different texture but similar nutrition",
      },
      {
        amount: 240,
        unit: "ml",
        name: "coconut milk",
        substitute: "Any plant milk — oat milk is particularly good",
      },
      {
        amount: 15,
        unit: "ml",
        name: "maple syrup",
        substitute: "Honey, agave, or medjool dates blended in",
      },
      {
        amount: 1,
        unit: "tsp",
        name: "vanilla extract",
        substitute: "Vanilla bean paste",
      },
      {
        amount: 1,
        unit: "whole",
        name: "ripe mango, diced",
        substitute: "Papaya or pineapple",
      },
      { amount: 15, unit: "ml", name: "lime juice", substitute: "Lemon juice" },
      {
        amount: 30,
        unit: "g",
        name: "toasted coconut flakes",
        substitute: "Granola or chopped nuts",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Whisk chia seeds, coconut milk, maple syrup, and vanilla together in a jar or bowl.",
      },
      {
        number: 2,
        instruction:
          "After 5 minutes, whisk again — this prevents the chia seeds clumping at the bottom.",
      },
      {
        number: 3,
        instruction:
          "Cover and refrigerate overnight, or for at least 4 hours.",
      },
      {
        number: 4,
        instruction:
          "Make the mango salsa: toss diced mango with lime juice and a pinch of chilli flakes if you like heat.",
      },
      {
        number: 5,
        instruction:
          "When ready to serve, give the pudding a stir. It should be thick and creamy. If too thick, add a splash of coconut milk.",
      },
      {
        number: 6,
        instruction:
          "Layer pudding and mango salsa in a glass. Top with toasted coconut flakes and serve.",
      },
    ],
  },
  {
    id: 4,
    title: "Spiced Lamb Kofta",
    description:
      "Juicy lamb kofta skewers seasoned with cumin, coriander and fresh herbs, served with tahini.",
    summary:
      "Kofta is street food perfected over centuries. The combination of lamb fat, warm spices, and fresh herbs creates something that smells as extraordinary as it tastes. The key is keeping the mixture cold before grilling — warm fat makes the mixture fall apart. Serve with warm flatbread, tahini sauce, and pickled red onions for a complete meal that feels like a restaurant but takes 35 minutes.",
    author: {
      name: "Karim Hassan",
      bio: "Middle Eastern food historian and home cook in Durban.",
    },
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "35 min",
    prepTime: 20,
    cookTime: 15,
    calories: 510,
    protein: 38,
    carbs: 12,
    fat: 34,
    servings: 4,
    rating: 4.6,
    badge: "🔥 Trending",
    category: "high-protein",
    cuisine: "middle-eastern",
    diet: ["gluten-free"],
    tags: ["High-Protein", "Grilled"],
    difficulty: "medium",
    ingredients: [
      {
        amount: 600,
        unit: "g",
        name: "minced lamb (20% fat)",
        substitute: "Minced beef — slightly less rich",
      },
      {
        amount: 1,
        unit: "whole",
        name: "onion, grated",
        substitute: "Shallots",
      },
      {
        amount: 4,
        unit: "cloves",
        name: "garlic, minced",
        substitute: "1 tsp garlic powder",
      },
      {
        amount: 2,
        unit: "tsp",
        name: "ground cumin",
        substitute: "Caraway seeds, toasted and ground",
      },
      {
        amount: 2,
        unit: "tsp",
        name: "ground coriander",
        substitute: "Mixed spice",
      },
      { amount: 1, unit: "tsp", name: "cinnamon", substitute: "Allspice" },
      {
        amount: 20,
        unit: "g",
        name: "fresh parsley, finely chopped",
        substitute: "Fresh coriander or mint",
      },
      {
        amount: 150,
        unit: "g",
        name: "tahini",
        substitute: "Greek yoghurt with garlic",
      },
      {
        amount: 30,
        unit: "ml",
        name: "lemon juice",
        substitute: "White wine vinegar",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Combine lamb, grated onion (squeeze out excess water first), garlic, spices, parsley, salt and pepper. Mix thoroughly with your hands.",
      },
      {
        number: 2,
        instruction:
          "Refrigerate mixture for at least 30 minutes — this firms it up and helps it stay on the skewers.",
      },
      {
        number: 3,
        instruction:
          "Divide mixture into 8 portions. Shape each around a flat metal skewer, forming a log shape about 12cm long.",
      },
      {
        number: 4,
        instruction:
          "Make tahini sauce: whisk tahini, lemon juice, garlic, and enough water to reach a drizzlable consistency. Season generously.",
      },
      {
        number: 5,
        instruction:
          "Grill kofta over high heat, turning every 2-3 minutes, for 10-12 minutes total until charred and cooked through.",
      },
      {
        number: 6,
        instruction:
          "Serve immediately with tahini sauce, warm flatbread, and fresh parsley.",
      },
    ],
  },
  {
    id: 5,
    title: "Avocado Toast Three Ways",
    description:
      "Three gorgeous takes on avocado toast: classic, spicy kimchi, and everything bagel style.",
    summary:
      "Avocado toast became a cultural phenomenon for a reason — it is genuinely delicious and endlessly adaptable. This recipe gives you three versions in one: the classic with lemon and sea salt, a spicy kimchi version with a fried egg, and an everything bagel version with cream cheese and capers. Master all three and you have breakfast covered for a week.",
    author: {
      name: "Zoe Abramowitz",
      bio: "Brunch obsessive and food photographer in Cape Town.",
    },
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "12 min",
    prepTime: 10,
    cookTime: 2,
    calories: 340,
    protein: 9,
    carbs: 28,
    fat: 22,
    servings: 1,
    rating: 4.5,
    badge: "⚡ Quick",
    category: "quick",
    cuisine: "american",
    diet: ["vegetarian", "dairy-free"],
    tags: ["Quick", "Vegetarian"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 2,
        unit: "slices",
        name: "sourdough bread, thickly cut",
        substitute: "Any crusty bread or gluten-free alternative",
      },
      {
        amount: 1,
        unit: "whole",
        name: "ripe avocado",
        substitute: "No real substitute — this is the dish",
      },
      { amount: 15, unit: "ml", name: "lemon juice", substitute: "Lime juice" },
      {
        amount: 2,
        unit: "g",
        name: "flaky sea salt",
        substitute: "Regular salt — less dramatic but fine",
      },
      {
        amount: 5,
        unit: "g",
        name: "chilli flakes",
        substitute: "Fresh chilli",
      },
      {
        amount: 60,
        unit: "g",
        name: "kimchi, roughly chopped",
        substitute: "Pickled jalapeños for a different heat",
      },
      {
        amount: 10,
        unit: "g",
        name: "everything bagel seasoning",
        substitute: "Sesame seeds, poppy seeds, dried garlic mixed",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Toast bread until deeply golden and crisp — a pale toast will not hold the weight of the toppings.",
      },
      {
        number: 2,
        instruction:
          "Halve avocado, remove stone. Scoop flesh into a bowl, add lemon juice and a pinch of salt. Mash to your preferred texture — chunky or smooth.",
      },
      {
        number: 3,
        instruction:
          "Classic version: spread mashed avocado on toast. Top with flaky salt, chilli flakes, and a drizzle of good olive oil.",
      },
      {
        number: 4,
        instruction:
          "Kimchi version: spread avocado, top with kimchi and a fried egg. Finish with sesame oil and spring onions.",
      },
      {
        number: 5,
        instruction:
          "Everything bagel version: spread cream cheese first, then avocado. Top with everything bagel seasoning and capers.",
      },
    ],
  },
  {
    id: 6,
    title: "Baklava Cheesecake",
    description:
      "A marriage of creamy vanilla cheesecake and flaky honey-walnut baklava on a buttery pastry base.",
    summary:
      "This dessert exists because two great things are almost always better together. The base is layers of buttered filo pastry — the same technique as traditional baklava. The filling is a classic New York-style cheesecake. The top is drenched in honey syrup with rose water and pistachios. It sounds complicated. It is not. It just requires patience and a good springform tin.",
    author: {
      name: "Yasmine Khalil",
      bio: "Pastry chef and Middle Eastern dessert specialist in Pretoria.",
    },
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "90 min",
    prepTime: 40,
    cookTime: 50,
    calories: 520,
    protein: 9,
    carbs: 58,
    fat: 29,
    servings: 12,
    rating: 4.9,
    badge: "👨‍🍳 Chef's Pick",
    category: "dessert",
    cuisine: "middle-eastern",
    diet: ["vegetarian"],
    tags: ["Dessert", "Baked"],
    difficulty: "hard",
    ingredients: [
      {
        amount: 200,
        unit: "g",
        name: "filo pastry sheets",
        substitute: "Puff pastry — less flaky but easier",
      },
      {
        amount: 120,
        unit: "g",
        name: "unsalted butter, melted",
        substitute: "Clarified butter or ghee",
      },
      {
        amount: 500,
        unit: "g",
        name: "cream cheese, room temperature",
        substitute: "Mascarpone for a richer result",
      },
      {
        amount: 150,
        unit: "g",
        name: "caster sugar",
        substitute: "Coconut sugar changes the flavour but works",
      },
      {
        amount: 3,
        unit: "whole",
        name: "eggs",
        substitute: "No substitute in cheesecake",
      },
      {
        amount: 150,
        unit: "g",
        name: "walnuts, roughly chopped",
        substitute: "Pistachios or pecans",
      },
      {
        amount: 120,
        unit: "ml",
        name: "honey",
        substitute: "Maple syrup — less floral",
      },
      {
        amount: 15,
        unit: "ml",
        name: "rose water",
        substitute: "Orange blossom water or vanilla",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Preheat oven to 160°C. Grease a 23cm springform tin. Layer filo sheets in the tin, brushing each layer with melted butter. Let excess hang over the sides.",
      },
      {
        number: 2,
        instruction:
          "Beat cream cheese and sugar until smooth and no lumps remain. Add eggs one at a time, mixing on low speed after each addition.",
      },
      {
        number: 3,
        instruction:
          "Scatter half the walnuts over the filo base. Pour over the cheesecake mixture. Fold overhanging filo over the top.",
      },
      {
        number: 4,
        instruction:
          "Bake 45-50 minutes until the edges are set but the centre has a slight wobble. Turn off the oven and leave the door ajar for 1 hour.",
      },
      {
        number: 5,
        instruction:
          "Make syrup: heat honey, rose water, and 2 tbsp water until combined. Pour over the warm cheesecake.",
      },
      {
        number: 6,
        instruction:
          "Top with remaining walnuts and crushed pistachios. Refrigerate at least 4 hours before serving.",
      },
    ],
  },
  {
    id: 7,
    title: "Thai Green Curry",
    description:
      "Fragrant coconut milk curry with crisp vegetables, Thai basil, and jasmine rice.",
    summary:
      "A good green curry should smell like a Thai street market and taste like sunshine. The depth comes from the paste — galangal, lemongrass, green chillies, and kaffir lime — which you can make from scratch or buy from any good supermarket. The technique is simple: fry the paste until fragrant, add coconut milk, add vegetables in order of how long they need to cook. Do not overcook the vegetables. Crunch matters.",
    author: {
      name: "Sirin Thongchai",
      bio: "Thai cooking teacher and cookbook author based in Sandton.",
    },
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "30 min",
    prepTime: 10,
    cookTime: 20,
    calories: 480,
    protein: 12,
    carbs: 58,
    fat: 22,
    servings: 4,
    rating: 4.7,
    badge: "🔥 Trending",
    category: "comfort",
    cuisine: "asian",
    diet: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    tags: ["Vegan", "Spicy"],
    difficulty: "medium",
    ingredients: [
      {
        amount: 400,
        unit: "ml",
        name: "coconut milk",
        substitute: "Coconut cream — richer and thicker",
      },
      {
        amount: 60,
        unit: "g",
        name: "green curry paste",
        substitute: "Red curry paste for a different heat profile",
      },
      {
        amount: 300,
        unit: "g",
        name: "jasmine rice",
        substitute: "Basmati or cauliflower rice",
      },
      {
        amount: 200,
        unit: "g",
        name: "aubergine, cubed",
        substitute: "Courgette or sweet potato",
      },
      {
        amount: 150,
        unit: "g",
        name: "baby spinach",
        substitute: "Pak choi or broccolini",
      },
      {
        amount: 200,
        unit: "g",
        name: "sugar snap peas",
        substitute: "Edamame or green beans",
      },
      {
        amount: 30,
        unit: "ml",
        name: "fish sauce",
        substitute: "Soy sauce for vegan version",
      },
      {
        amount: 15,
        unit: "g",
        name: "palm sugar or brown sugar",
        substitute: "Coconut sugar",
      },
      {
        amount: 20,
        unit: "g",
        name: "fresh Thai basil",
        substitute: "Regular basil — less anise flavour",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Cook jasmine rice according to packet instructions. Keep warm.",
      },
      {
        number: 2,
        instruction:
          "Heat 2 tbsp of the thick coconut cream (from the top of the can) in a wok over medium-high heat. Fry curry paste for 2 minutes until very fragrant.",
      },
      {
        number: 3,
        instruction: "Add aubergine and stir-fry in the paste for 3 minutes.",
      },
      {
        number: 4,
        instruction:
          "Pour in remaining coconut milk. Bring to a simmer. Add fish sauce and sugar.",
      },
      {
        number: 5,
        instruction:
          "Add sugar snap peas and simmer 5 minutes. Stir in spinach until just wilted.",
      },
      {
        number: 6,
        instruction:
          "Taste and adjust seasoning. Serve over jasmine rice topped with fresh Thai basil and sliced red chilli.",
      },
    ],
  },
  {
    id: 8,
    title: "Shakshuka",
    description:
      "Eggs poached in a rich, spiced tomato and pepper sauce. The ultimate one-pan breakfast.",
    summary:
      "Shakshuka is the kind of dish that has strong opinions attached to it. Every North African and Middle Eastern family has their version — some add harissa, some add merguez sausage, some keep it pure and simple. This version is straightforward and reliable: a deeply spiced tomato base with just enough heat, finished with eggs poached directly in the sauce. Eat it straight from the pan with good bread. That is the only correct way.",
    author: {
      name: "Nadia Ben Ali",
      bio: "Tunisian food writer and culinary storyteller in Cape Town.",
    },
    image:
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "25 min",
    prepTime: 8,
    cookTime: 17,
    calories: 310,
    protein: 16,
    carbs: 22,
    fat: 18,
    servings: 2,
    rating: 4.8,
    badge: "⭐ Top Rated",
    category: "breakfast",
    cuisine: "middle-eastern",
    diet: ["vegetarian", "gluten-free"],
    tags: ["Vegetarian", "One-Pan"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 400,
        unit: "g",
        name: "crushed tomatoes (1 tin)",
        substitute: "Fresh tomatoes, blended",
      },
      {
        amount: 2,
        unit: "whole",
        name: "red peppers, diced",
        substitute: "Yellow peppers",
      },
      {
        amount: 1,
        unit: "whole",
        name: "onion, finely diced",
        substitute: "Shallots",
      },
      {
        amount: 4,
        unit: "cloves",
        name: "garlic, minced",
        substitute: "1 tsp garlic powder",
      },
      { amount: 2, unit: "tsp", name: "cumin", substitute: "Caraway seeds" },
      {
        amount: 1,
        unit: "tsp",
        name: "smoked paprika",
        substitute: "Sweet paprika",
      },
      {
        amount: 1,
        unit: "tsp",
        name: "harissa paste",
        substitute: "Chilli flakes",
      },
      {
        amount: 4,
        unit: "whole",
        name: "eggs",
        substitute: "No substitute — eggs are essential",
      },
      { amount: 60, unit: "g", name: "feta cheese", substitute: "Goat cheese" },
      {
        amount: 15,
        unit: "g",
        name: "fresh coriander",
        substitute: "Fresh parsley",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Heat olive oil in a wide, deep frying pan. Sauté onion and pepper over medium heat for 8 minutes until soft and slightly caramelised.",
      },
      {
        number: 2,
        instruction:
          "Add garlic, cumin, paprika, and harissa. Stir for 1 minute until very fragrant.",
      },
      {
        number: 3,
        instruction:
          "Pour in crushed tomatoes. Season generously. Simmer 10 minutes until sauce thickens.",
      },
      {
        number: 4,
        instruction:
          "Use a spoon to make 4 wells in the sauce. Crack an egg into each well.",
      },
      {
        number: 5,
        instruction:
          "Cover the pan and cook 5-7 minutes until whites are set but yolks are still runny.",
      },
      {
        number: 6,
        instruction:
          "Scatter feta and fresh coriander over the top. Bring the pan to the table and serve with crusty bread.",
      },
    ],
  },
  {
    id: 9,
    title: "Beef Bulgogi Bowl",
    description:
      "Tender marinated Korean beef with sesame rice, pickled daikon, and a soft-boiled egg.",
    summary:
      "Bulgogi means fire meat in Korean, which tells you everything about what this dish should feel like. The marinade is a balance of sweet, salty, and deeply savoury — soy sauce, Asian pear for natural tenderising enzymes, sesame oil, and ginger. The beef should be sliced paper-thin so it absorbs the marinade quickly and cooks in minutes. The pickled daikon cuts through the richness in a way that makes every bite feel fresh.",
    author: {
      name: "Ji-Young Park",
      bio: "Korean food enthusiast and supper club host in Johannesburg.",
    },
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "40 min",
    prepTime: 25,
    cookTime: 15,
    calories: 560,
    protein: 42,
    carbs: 48,
    fat: 18,
    servings: 2,
    rating: 4.8,
    badge: "⭐ Top Rated",
    category: "high-protein",
    cuisine: "asian",
    diet: ["dairy-free"],
    tags: ["High-Protein", "Korean"],
    difficulty: "medium",
    ingredients: [
      {
        amount: 400,
        unit: "g",
        name: "beef sirloin, very thinly sliced",
        substitute: "Ribeye or flank steak",
      },
      {
        amount: 60,
        unit: "ml",
        name: "soy sauce",
        substitute: "Tamari for gluten-free",
      },
      {
        amount: 30,
        unit: "ml",
        name: "sesame oil",
        substitute: "Cannot substitute — this is the flavour",
      },
      {
        amount: 60,
        unit: "g",
        name: "Asian pear, grated",
        substitute: "Kiwi fruit — also has tenderising enzymes",
      },
      {
        amount: 15,
        unit: "g",
        name: "ginger, grated",
        substitute: "1 tsp ground ginger",
      },
      {
        amount: 4,
        unit: "cloves",
        name: "garlic, minced",
        substitute: "1 tsp garlic powder",
      },
      { amount: 20, unit: "g", name: "brown sugar", substitute: "Honey" },
      {
        amount: 300,
        unit: "g",
        name: "jasmine rice",
        substitute: "Brown rice or cauliflower rice",
      },
      {
        amount: 100,
        unit: "g",
        name: "daikon radish, julienned",
        substitute: "Cucumber, thinly sliced",
      },
      {
        amount: 2,
        unit: "whole",
        name: "soft-boiled eggs",
        substitute: "Fried eggs",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Combine soy sauce, sesame oil, grated pear, ginger, garlic, and sugar. Marinate beef slices for at least 20 minutes, ideally 2 hours.",
      },
      {
        number: 2,
        instruction:
          "Pickle the daikon: toss with rice vinegar, sugar, and salt. Leave 20 minutes minimum.",
      },
      {
        number: 3,
        instruction:
          "Soft boil eggs: 6.5 minutes in boiling water, transfer to ice water, peel.",
      },
      { number: 4, instruction: "Cook rice and keep warm." },
      {
        number: 5,
        instruction:
          "Heat a wok or cast iron pan until smoking hot. Cook beef in a single layer without moving for 1-2 minutes. Flip once. Work in batches — do not crowd the pan.",
      },
      {
        number: 6,
        instruction:
          "Assemble bowls: rice base, bulgogi beef, pickled daikon, soft-boiled egg halved, sesame seeds and spring onions.",
      },
    ],
  },
  {
    id: 10,
    title: "Margherita Flatbread",
    description:
      "Crispy flatbread with San Marzano tomatoes, fresh mozzarella, and torn basil.",
    summary:
      "The Margherita is an argument for restraint. Three ingredients on bread. The reason it works is quality — San Marzano tomatoes are sweeter and less acidic than regular tinned tomatoes, fresh mozzarella has a milkiness that dried mozzarella cannot replicate, and fresh basil added after baking stays bright and fragrant. This version uses flatbread because it gets crispier faster than pizza dough. Fifteen minutes from fridge to table.",
    author: {
      name: "Sofia Caruso",
      bio: "Neapolitan food writer and pizza enthusiast in Cape Town.",
    },
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "15 min",
    prepTime: 5,
    cookTime: 10,
    calories: 390,
    protein: 18,
    carbs: 44,
    fat: 16,
    servings: 2,
    rating: 4.5,
    badge: "⚡ Quick",
    category: "quick",
    cuisine: "italian",
    diet: ["vegetarian"],
    tags: ["Quick", "Vegetarian"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 2,
        unit: "whole",
        name: "flatbreads or naan",
        substitute: "Pita bread or thin pizza base",
      },
      {
        amount: 200,
        unit: "g",
        name: "San Marzano tomatoes, crushed",
        substitute: "Good quality tinned tomatoes",
      },
      {
        amount: 200,
        unit: "g",
        name: "fresh mozzarella, torn",
        substitute: "Burrata for an even richer result",
      },
      {
        amount: 2,
        unit: "cloves",
        name: "garlic, minced",
        substitute: "Garlic powder",
      },
      { amount: 20, unit: "ml", name: "olive oil", substitute: "Avocado oil" },
      {
        amount: 20,
        unit: "g",
        name: "fresh basil leaves",
        substitute: "Dried basil — less vibrant but fine",
      },
      {
        amount: 2,
        unit: "g",
        name: "flaky sea salt",
        substitute: "Regular salt",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Preheat oven to 220°C. Place flatbreads on a baking tray.",
      },
      {
        number: 2,
        instruction:
          "Mix crushed tomatoes with garlic, olive oil, salt and pepper. Spread a thin, even layer on each flatbread — less than you think.",
      },
      {
        number: 3,
        instruction:
          "Tear mozzarella and distribute evenly, leaving some gaps — the tomato should still be visible.",
      },
      {
        number: 4,
        instruction:
          "Bake 8-10 minutes until edges are golden and cheese is bubbling with some brown spots.",
      },
      {
        number: 5,
        instruction:
          "Remove from oven. Immediately scatter fresh basil, drizzle with olive oil, and finish with flaky salt.",
      },
    ],
  },
  {
    id: 11,
    title: "Lemon Herb Salmon",
    description:
      "Pan-seared salmon fillet with a bright lemon-herb crust, served with roasted asparagus.",
    summary:
      "Salmon is one of the most forgiving proteins to cook, which makes it ideal for weeknights. The key is getting the pan properly hot before the fish goes in — that is what creates the crust. The lemon-herb butter at the end is called basting and it is the difference between good salmon and great salmon. Cook the asparagus in the same pan after the salmon to pick up all those flavours.",
    author: {
      name: "Thabo Mokoena",
      bio: "South African chef with a focus on simple, seasonal cooking.",
    },
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "20 min",
    prepTime: 8,
    cookTime: 12,
    calories: 430,
    protein: 46,
    carbs: 8,
    fat: 24,
    servings: 2,
    rating: 4.7,
    badge: "🔥 Trending",
    category: "high-protein",
    cuisine: "mediterranean",
    diet: ["gluten-free", "dairy-free"],
    tags: ["High-Protein", "Pescatarian"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 400,
        unit: "g",
        name: "salmon fillets (2 pieces, skin on)",
        substitute: "Trout or sea bass",
      },
      {
        amount: 250,
        unit: "g",
        name: "asparagus, trimmed",
        substitute: "Broccolini or green beans",
      },
      {
        amount: 30,
        unit: "g",
        name: "unsalted butter",
        substitute: "Olive oil for dairy-free",
      },
      {
        amount: 2,
        unit: "cloves",
        name: "garlic, minced",
        substitute: "Garlic powder",
      },
      {
        amount: 1,
        unit: "whole",
        name: "lemon, zested and juiced",
        substitute: "Lime for a different flavour",
      },
      {
        amount: 15,
        unit: "g",
        name: "fresh dill",
        substitute: "Fresh tarragon or chervil",
      },
      {
        amount: 15,
        unit: "g",
        name: "fresh parsley",
        substitute: "Fresh chives",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Pat salmon completely dry. Season flesh side generously with salt and pepper.",
      },
      {
        number: 2,
        instruction:
          "Heat a stainless steel or cast iron pan over high heat until very hot. Add oil — it should shimmer immediately.",
      },
      {
        number: 3,
        instruction:
          "Place salmon skin-side down. Press gently with a spatula for 30 seconds to prevent curling. Cook 4 minutes without moving.",
      },
      {
        number: 4,
        instruction:
          "Flip. Reduce heat to medium. Add butter, garlic, and lemon zest. As butter foams, spoon it continuously over the salmon for 2-3 minutes.",
      },
      {
        number: 5,
        instruction:
          "Remove salmon. In the same pan, toss asparagus over high heat for 3-4 minutes until tender-crisp.",
      },
      {
        number: 6,
        instruction:
          "Plate asparagus, place salmon on top. Squeeze lemon juice over, scatter herbs, serve immediately.",
      },
    ],
  },
  {
    id: 12,
    title: "Churros with Chocolate Sauce",
    description:
      "Golden fried churros dusted in cinnamon sugar with a thick dark chocolate dipping sauce.",
    summary:
      "Churros are fried choux pastry — the same base as profiteroles and eclairs — which means the technique is about getting the dough right before frying. The dough should be thick enough to pipe but not stiff. The oil must be at exactly 175°C — too hot and the outside burns before the inside cooks, too cool and they absorb oil and become greasy. A thermometer is not optional here. Everything else is easy.",
    author: {
      name: "Carmen Ortega",
      bio: "Spanish pastry chef and dessert columnist in Johannesburg.",
    },
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "35 min",
    prepTime: 15,
    cookTime: 20,
    calories: 490,
    protein: 7,
    carbs: 62,
    fat: 24,
    servings: 4,
    rating: 4.6,
    badge: "👨‍🍳 Chef's Pick",
    category: "dessert",
    cuisine: "american",
    diet: ["vegetarian"],
    tags: ["Dessert", "Fried"],
    difficulty: "medium",
    ingredients: [
      {
        amount: 240,
        unit: "ml",
        name: "water",
        substitute: "Milk — richer dough",
      },
      {
        amount: 60,
        unit: "g",
        name: "unsalted butter",
        substitute: "Neutral oil — less rich",
      },
      {
        amount: 150,
        unit: "g",
        name: "plain flour",
        substitute: "Gluten-free flour blend",
      },
      {
        amount: 2,
        unit: "whole",
        name: "eggs",
        substitute: "No substitute in choux",
      },
      {
        amount: 100,
        unit: "g",
        name: "caster sugar",
        substitute: "Coconut sugar",
      },
      {
        amount: 2,
        unit: "tsp",
        name: "ground cinnamon",
        substitute: "Cardamom for a different warmth",
      },
      {
        amount: 200,
        unit: "g",
        name: "dark chocolate (70%), chopped",
        substitute: "Milk chocolate for something sweeter",
      },
      {
        amount: 120,
        unit: "ml",
        name: "double cream",
        substitute: "Coconut cream for dairy-free",
      },
      {
        amount: 1,
        unit: "litre",
        name: "vegetable oil for frying",
        substitute: "Sunflower oil",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Bring water and butter to a boil. Add flour all at once and stir vigorously until dough comes together and pulls from the sides.",
      },
      {
        number: 2,
        instruction:
          "Cool dough 5 minutes. Add eggs one at a time, beating vigorously after each until smooth and glossy. Transfer to piping bag with star nozzle.",
      },
      {
        number: 3,
        instruction:
          "Make chocolate sauce: heat cream until barely simmering. Pour over chocolate. Leave 2 minutes then stir until smooth.",
      },
      {
        number: 4,
        instruction:
          "Heat oil to 175°C. Pipe 12cm lengths into the oil, cutting with scissors. Fry 3-4 minutes, turning, until deep golden.",
      },
      {
        number: 5,
        instruction:
          "Drain on paper towels. Immediately toss in cinnamon sugar.",
      },
      {
        number: 6,
        instruction: "Serve immediately with warm chocolate sauce for dipping.",
      },
    ],
  },
  {
    id: 13,
    title: "Moroccan Chickpea Stew",
    description:
      "Warming spiced chickpea and sweet potato stew with harissa, preserved lemon, and fresh coriander.",
    summary:
      "This stew is North African cooking at its most honest — simple ingredients transformed by the right spices. Ras el hanout is a spice blend that can contain anywhere from 10 to 30 spices depending on the maker. It is the backbone of Moroccan cooking and nothing else quite replaces it. The preserved lemon added at the end is what makes this taste like it has been cooking for hours rather than 45 minutes.",
    author: {
      name: "Fatima Benali",
      bio: "Moroccan food writer and cooking teacher in Cape Town.",
    },
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "45 min",
    prepTime: 12,
    cookTime: 33,
    calories: 380,
    protein: 14,
    carbs: 62,
    fat: 9,
    servings: 4,
    rating: 4.6,
    badge: "🔥 Trending",
    category: "vegan",
    cuisine: "middle-eastern",
    diet: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    tags: ["Vegan", "High-Fibre"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 800,
        unit: "g",
        name: "chickpeas, drained (2 tins)",
        substitute: "Butter beans or lentils",
      },
      {
        amount: 400,
        unit: "g",
        name: "sweet potato, cubed",
        substitute: "Butternut squash",
      },
      {
        amount: 400,
        unit: "g",
        name: "crushed tomatoes",
        substitute: "Fresh tomatoes, blended",
      },
      {
        amount: 2,
        unit: "tbsp",
        name: "ras el hanout",
        substitute: "Equal parts cumin, coriander, cinnamon and ginger",
      },
      {
        amount: 1,
        unit: "tbsp",
        name: "harissa paste",
        substitute: "Sriracha — different but adds heat",
      },
      {
        amount: 1,
        unit: "whole",
        name: "preserved lemon, rind only, finely chopped",
        substitute: "Fresh lemon zest — less complex",
      },
      {
        amount: 400,
        unit: "ml",
        name: "vegetable stock",
        substitute: "Water with a stock cube",
      },
      {
        amount: 20,
        unit: "g",
        name: "fresh coriander",
        substitute: "Fresh parsley",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Fry onion in olive oil over medium heat until softened, 8 minutes. Add garlic and ras el hanout, stir 2 minutes.",
      },
      {
        number: 2,
        instruction:
          "Add sweet potato, chickpeas, crushed tomatoes, harissa, and stock. Stir well.",
      },
      {
        number: 3,
        instruction:
          "Bring to a boil, reduce heat, cover and simmer 25 minutes until sweet potato is completely tender.",
      },
      {
        number: 4,
        instruction:
          "Stir in preserved lemon. Taste and adjust salt — preserved lemon is salty so taste before adding more.",
      },
      {
        number: 5,
        instruction:
          "Serve over couscous or flatbread, topped with fresh coriander, a spoonful of yoghurt, and drizzle of olive oil.",
      },
    ],
  },
  {
    id: 14,
    title: "Chicken Tikka Masala",
    description:
      "Tender chicken in a velvety tomato-cream sauce with warming spices.",
    summary:
      "Chicken Tikka Masala is technically a British invention — a Scottish chef is often credited with adding tomato cream sauce to tandoori chicken in the 1970s. But the flavours are rooted entirely in Indian cooking. The double cooking method — marinating and charring the chicken before adding it to the sauce — is what makes this dish extraordinary. The char flavour against the creamy sauce is the point. Do not skip the char.",
    author: {
      name: "Ravi Sharma",
      bio: "Indian-British chef and spice merchant based in Durban.",
    },
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "50 min",
    prepTime: 20,
    cookTime: 30,
    calories: 520,
    protein: 44,
    carbs: 22,
    fat: 28,
    servings: 4,
    rating: 4.9,
    badge: "⭐ Top Rated",
    category: "comfort",
    cuisine: "indian",
    diet: ["gluten-free"],
    tags: ["High-Protein", "Spicy"],
    difficulty: "medium",
    ingredients: [
      {
        amount: 700,
        unit: "g",
        name: "chicken thighs, boneless, cubed",
        substitute: "Chicken breast — less juicy but works",
      },
      {
        amount: 200,
        unit: "g",
        name: "full-fat yoghurt",
        substitute: "Coconut yoghurt for dairy-free",
      },
      {
        amount: 2,
        unit: "tbsp",
        name: "garam masala",
        substitute: "Curry powder — milder",
      },
      {
        amount: 1,
        unit: "tbsp",
        name: "ground cumin",
        substitute: "Caraway seeds, ground",
      },
      {
        amount: 400,
        unit: "g",
        name: "crushed tomatoes",
        substitute: "Tomato passata",
      },
      {
        amount: 200,
        unit: "ml",
        name: "double cream",
        substitute: "Coconut cream",
      },
      {
        amount: 1,
        unit: "whole",
        name: "onion, finely diced",
        substitute: "Shallots",
      },
      {
        amount: 30,
        unit: "g",
        name: "ginger, grated",
        substitute: "2 tsp ground ginger",
      },
      {
        amount: 6,
        unit: "cloves",
        name: "garlic, minced",
        substitute: "2 tsp garlic powder",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Marinate chicken in yoghurt, half the garam masala, cumin, and salt for at least 2 hours.",
      },
      {
        number: 2,
        instruction:
          "Grill or broil marinated chicken at high heat until charred on the outside but not fully cooked, about 8 minutes. Set aside.",
      },
      {
        number: 3,
        instruction:
          "Fry onion in ghee or oil until deeply golden, 15 minutes. Add ginger, garlic, remaining spices. Stir 2 minutes.",
      },
      {
        number: 4,
        instruction:
          "Add crushed tomatoes. Simmer 15 minutes until oil separates from the sauce — this is called bhunao and it means your base is ready.",
      },
      {
        number: 5,
        instruction:
          "Add cream and charred chicken. Simmer 10 minutes until chicken is cooked through and sauce coats the back of a spoon.",
      },
      {
        number: 6,
        instruction:
          "Finish with a knob of butter and fresh coriander. Serve with basmati rice and warm naan.",
      },
    ],
  },
  {
    id: 15,
    title: "Açaí Power Bowl",
    description:
      "Thick blended açaí base topped with granola, banana, berries, honey and coconut flakes.",
    summary:
      "Açaí comes from a palm tree native to the Amazon and has been eaten by indigenous Brazilian communities for centuries. The berries are almost never sold fresh outside Brazil — what you find is frozen pulp, which is actually better for this application because it blends into a thick, sorbet-like consistency. The toppings are where you can be creative. The base should be barely sweet so the toppings shine.",
    author: {
      name: "Valentina Cruz",
      bio: "Brazilian nutritionist and smoothie bowl specialist in Johannesburg.",
    },
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "10 min",
    prepTime: 10,
    cookTime: 0,
    calories: 320,
    protein: 6,
    carbs: 54,
    fat: 10,
    servings: 1,
    rating: 4.5,
    badge: "⚡ Quick",
    category: "breakfast",
    cuisine: "american",
    diet: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    tags: ["Vegan", "Quick"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 200,
        unit: "g",
        name: "frozen açaí pulp (unsweetened)",
        substitute: "Frozen mixed berries — different flavour profile",
      },
      {
        amount: 120,
        unit: "ml",
        name: "coconut milk or almond milk",
        substitute: "Any plant milk — add minimally for thick texture",
      },
      {
        amount: 1,
        unit: "whole",
        name: "frozen banana",
        substitute: "Fresh banana — less thick result",
      },
      {
        amount: 50,
        unit: "g",
        name: "granola",
        substitute: "Toasted oats with nuts",
      },
      {
        amount: 100,
        unit: "g",
        name: "mixed fresh berries",
        substitute: "Any fresh or frozen fruit",
      },
      {
        amount: 30,
        unit: "g",
        name: "coconut flakes, toasted",
        substitute: "Shredded coconut",
      },
      {
        amount: 15,
        unit: "ml",
        name: "honey or maple syrup",
        substitute: "Agave",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Break frozen açaí into chunks. Blend with frozen banana and just enough milk to get things moving — start with 60ml and add more only if needed. You want a thick, spoonable consistency, not drinkable.",
      },
      { number: 2, instruction: "Pour into a chilled bowl immediately." },
      {
        number: 3,
        instruction:
          "Working quickly before it melts, arrange toppings in sections: granola, fresh berries, coconut flakes, and banana slices.",
      },
      {
        number: 4,
        instruction: "Drizzle honey over everything. Serve immediately.",
      },
    ],
  },
  {
    id: 16,
    title: "Beef Wellington",
    description:
      "Tenderloin wrapped in mushroom duxelles and golden puff pastry.",
    summary:
      "Beef Wellington is the ultimate test of a cook's confidence. The margin for error is small — undercooked pastry, overcooked beef, soggy duxelles from mushrooms that were not properly dried. But when it works, there is nothing quite like it. The duxelles — mushrooms cooked down to an almost paste-like consistency — acts as a moisture barrier and flavour layer between the beef and the pastry. Do not rush it.",
    author: {
      name: "James Whitfield",
      bio: "Classical French-trained chef and culinary educator in Cape Town.",
    },
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "120 min",
    prepTime: 60,
    cookTime: 60,
    calories: 780,
    protein: 58,
    carbs: 32,
    fat: 46,
    servings: 6,
    rating: 4.9,
    badge: "👨‍🍳 Chef's Pick",
    category: "high-protein",
    cuisine: "french",
    diet: [],
    tags: ["High-Protein", "Special Occasion"],
    difficulty: "hard",
    ingredients: [
      {
        amount: 900,
        unit: "g",
        name: "beef tenderloin, centre cut, trimmed",
        substitute: "No real substitute for Wellington",
      },
      {
        amount: 500,
        unit: "g",
        name: "chestnut mushrooms, very finely chopped",
        substitute: "Portobello mushrooms",
      },
      {
        amount: 6,
        unit: "slices",
        name: "Parma ham or prosciutto",
        substitute: "Serrano ham",
      },
      {
        amount: 500,
        unit: "g",
        name: "ready-rolled puff pastry",
        substitute: "Homemade rough puff — better but time-consuming",
      },
      {
        amount: 2,
        unit: "whole",
        name: "egg yolks, beaten",
        substitute: "Whole egg wash — less golden",
      },
      {
        amount: 30,
        unit: "g",
        name: "unsalted butter",
        substitute: "Olive oil",
      },
      {
        amount: 3,
        unit: "cloves",
        name: "garlic, minced",
        substitute: "Garlic powder",
      },
      {
        amount: 15,
        unit: "g",
        name: "fresh thyme",
        substitute: "Dried thyme — use half the amount",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Sear tenderloin in a very hot pan with oil on all sides until deeply browned all over, about 6 minutes total. Season generously. Cool completely then refrigerate 30 minutes.",
      },
      {
        number: 2,
        instruction:
          "Make duxelles: cook mushrooms, garlic, and thyme in butter over medium heat, stirring frequently, for 20-25 minutes until all moisture has evaporated and mixture is almost paste-like. Season. Cool completely.",
      },
      {
        number: 3,
        instruction:
          "Lay Parma ham slices overlapping on cling film. Spread duxelles evenly over ham. Place beef at the near edge and roll tightly. Twist ends closed. Refrigerate 30 minutes.",
      },
      {
        number: 4,
        instruction:
          "Wrap beef roll in puff pastry. Seal edges with egg wash. Score the top decoratively. Brush all over with egg wash. Refrigerate 15 minutes.",
      },
      {
        number: 5,
        instruction:
          "Bake at 220°C for 25-30 minutes until pastry is deep golden and beef internal temperature is 52°C for medium-rare.",
      },
      {
        number: 6,
        instruction:
          "Rest 10 minutes minimum before cutting. This is not optional — cutting too soon loses all the juices.",
      },
    ],
  },
  {
    id: 17,
    title: "Caprese Salad",
    description:
      "Heirloom tomatoes, buffalo mozzarella, and fresh basil with aged balsamic.",
    summary:
      "The Caprese salad is Italy making a point about ingredients. There are four components and no technique — the work was done by the farmer who grew the tomatoes and the cheesemaker who made the mozzarella. Use the best tomatoes you can find, ideally at room temperature from the sun. Cold tomatoes taste of nothing. The aged balsamic glaze — syrupy, sweet, and tangy — elevates the whole thing into something greater than its parts.",
    author: {
      name: "Lucia Romano",
      bio: "Italian food writer and olive oil specialist based in Cape Town.",
    },
    image:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "10 min",
    prepTime: 10,
    cookTime: 0,
    calories: 240,
    protein: 14,
    carbs: 8,
    fat: 17,
    servings: 2,
    rating: 4.4,
    badge: "⚡ Quick",
    category: "mediterranean",
    cuisine: "italian",
    diet: ["vegetarian", "gluten-free"],
    tags: ["Vegetarian", "No-Cook"],
    difficulty: "easy",
    ingredients: [
      {
        amount: 400,
        unit: "g",
        name: "heirloom or beef tomatoes, thickly sliced",
        substitute: "Any ripe tomatoes — quality matters more than variety",
      },
      {
        amount: 250,
        unit: "g",
        name: "buffalo mozzarella, sliced",
        substitute: "Burrata for extra creaminess",
      },
      {
        amount: 30,
        unit: "g",
        name: "fresh basil leaves",
        substitute: "Fresh rocket — peppery alternative",
      },
      {
        amount: 30,
        unit: "ml",
        name: "aged balsamic glaze",
        substitute: "Regular balsamic reduced with a little honey",
      },
      {
        amount: 30,
        unit: "ml",
        name: "extra virgin olive oil",
        substitute: "Use the best you have — it matters here",
      },
      {
        amount: 3,
        unit: "g",
        name: "flaky sea salt",
        substitute: "Regular salt — less dramatic",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Take tomatoes and mozzarella out of the fridge 30 minutes before serving. Room temperature makes a significant difference to flavour.",
      },
      {
        number: 2,
        instruction:
          "Slice tomatoes thickly — at least 1cm. Slice mozzarella to similar thickness.",
      },
      {
        number: 3,
        instruction:
          "Arrange alternating slices of tomato and mozzarella on a platter, slightly overlapping.",
      },
      { number: 4, instruction: "Tuck whole basil leaves between the slices." },
      {
        number: 5,
        instruction:
          "Drizzle generously with olive oil and balsamic glaze. Finish with flaky salt and cracked black pepper. Serve immediately.",
      },
    ],
  },
  {
    id: 18,
    title: "Pad Thai",
    description:
      "Wok-fried rice noodles with prawns, egg, bean sprouts, and tamarind-peanut sauce.",
    summary:
      "Pad Thai was promoted as Thailand's national dish in the 1930s as part of a nationalism campaign. The government gave out recipes and woks to encourage street food vendors to sell it. Whatever its origins, the dish works because tamarind paste provides a sourness that is different from vinegar or lemon — deeper and more complex. If you cannot find tamarind paste, the dish will still be good. But if you can find it, use it.",
    author: {
      name: "Malee Srisook",
      bio: "Thai street food expert and cooking instructor in Johannesburg.",
    },
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&q=85",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    time: "25 min",
    prepTime: 15,
    cookTime: 10,
    calories: 510,
    protein: 28,
    carbs: 62,
    fat: 16,
    servings: 2,
    rating: 4.7,
    badge: "🔥 Trending",
    category: "quick",
    cuisine: "asian",
    diet: ["gluten-free", "dairy-free"],
    tags: ["Quick", "Seafood"],
    difficulty: "medium",
    ingredients: [
      {
        amount: 200,
        unit: "g",
        name: "flat rice noodles",
        substitute: "Glass noodles or thin egg noodles",
      },
      {
        amount: 250,
        unit: "g",
        name: "prawns, peeled and deveined",
        substitute: "Tofu or chicken for different protein",
      },
      {
        amount: 3,
        unit: "whole",
        name: "eggs",
        substitute: "No substitute — scrambled eggs are part of the dish",
      },
      {
        amount: 40,
        unit: "ml",
        name: "tamarind paste",
        substitute: "Lime juice + splash of Worcestershire sauce",
      },
      {
        amount: 30,
        unit: "ml",
        name: "fish sauce",
        substitute: "Soy sauce — less complex but works",
      },
      {
        amount: 15,
        unit: "g",
        name: "palm sugar or brown sugar",
        substitute: "Honey",
      },
      {
        amount: 150,
        unit: "g",
        name: "bean sprouts",
        substitute: "Shredded cabbage",
      },
      {
        amount: 4,
        unit: "whole",
        name: "spring onions, sliced",
        substitute: "Regular onion — less fresh flavour",
      },
      {
        amount: 60,
        unit: "g",
        name: "roasted peanuts, roughly chopped",
        substitute: "Cashews",
      },
      {
        amount: 1,
        unit: "whole",
        name: "lime, cut into wedges",
        substitute: "Lemon",
      },
    ],
    steps: [
      {
        number: 1,
        instruction:
          "Soak rice noodles in cold water for 30 minutes. Drain. Mix tamarind, fish sauce, and sugar in a small bowl — this is your sauce. Taste it. It should be sour, salty and slightly sweet.",
      },
      {
        number: 2,
        instruction:
          "Heat wok over the highest heat you have until smoking. Add oil. Stir-fry prawns 2 minutes until just pink. Push to the side.",
      },
      {
        number: 3,
        instruction:
          "Crack eggs into the wok. Scramble briefly then mix with the prawns before fully set.",
      },
      {
        number: 4,
        instruction:
          "Add drained noodles. Pour sauce over. Toss everything together continuously for 2 minutes.",
      },
      {
        number: 5,
        instruction:
          "Add bean sprouts and most of the spring onions. Toss 30 seconds — you want the sprouts to stay crunchy.",
      },
      {
        number: 6,
        instruction:
          "Plate immediately. Top with peanuts, remaining spring onions, lime wedge. Serve with chilli flakes and extra fish sauce on the side.",
      },
    ],
  },
];
