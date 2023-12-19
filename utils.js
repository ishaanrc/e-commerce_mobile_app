// utils.js
// Define this in a separate file and import where needed
export const generateShoppingList = (selectedRecipes) => {
  const shoppingList = {};
  selectedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      shoppingList[ingredient] = (shoppingList[ingredient] || 0) + 1;
    });
  });
  return shoppingList;
};
