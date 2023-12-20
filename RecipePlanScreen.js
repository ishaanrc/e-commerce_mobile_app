import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useState } from 'react';


const RecipePlanScreen = ({ route, navigation }) => {
  const initialRecipePlan = route.params.recipePlan; // Or some default structure
  const [recipePlan, setRecipePlan] = useState(initialRecipePlan);
  const allRecipes = [
    { name: "Spaghetti Bolognese", ingredients: ["pasta", "tomato sauce", "ground beef"] },
    { name: "Vegetable Stir Fry", ingredients: ["mixed vegetables", "soy sauce", "tofu"] },
    { name: "Chicken Caesar Salad", ingredients: ["lettuce", "croutons", "chicken breast"] },
    { name: "Quinoa and Black Bean Salad", ingredients: ["quinoa", "black beans", "corn", "tomatoes"] },
    { name: "Beef Stroganoff", ingredients: ["beef", "mushrooms", "sour cream", "onion"] },
    { name: "Teriyaki Chicken", ingredients: ["chicken", "teriyaki sauce", "rice", "broccoli"] },
    { name: "Shrimp Pad Thai", ingredients: ["shrimp", "rice noodles", "peanuts", "bean sprouts"] },
    { name: "Pulled Pork Sandwich", ingredients: ["pork", "BBQ sauce", "buns", "coleslaw"] },
    { name: "Mushroom Risotto", ingredients: ["arborio rice", "mushrooms", "chicken broth", "Parmesan cheese"] },
    { name: "Fish Tacos", ingredients: ["fish", "tortillas", "cabbage", "avocado", "lime"] },
  ];

  const calculateIngredients = () => {
    let ingredientsList = {};
    Object.values(recipePlan).forEach(day => {
      Object.values(day).forEach(meals => {
        meals.forEach(recipe => {
          recipe.ingredients.forEach(ingredient => {
            if (ingredientsList[ingredient]) {
              ingredientsList[ingredient]++;
            } else {
              ingredientsList[ingredient] = 1;
            }
          });
        });
      });
    });
    return ingredientsList;
  };

  const handleNext = () => {
    const ingredients = calculateIngredients();
    navigation.navigate('ShoppingCartScreen', { ingredients });
  };

  const renderRecipesForMeal = (recipes, mealType, day) => (
    <View>
      <Text style={styles.mealType}>{mealType.toUpperCase()}</Text>
      {recipes.map((recipe, index) => (
        <View key={index} style={styles.recipeContainer}>
          <View style={styles.recipeDetails}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            {/* Render other details of the recipe as needed */}
          </View>
          <Button 
            title="Swap" 
            onPress={() => handleSwapRecipe(day, mealType, index)} 
            style={styles.swapButton} 
          />
        </View>
      ))}
    </View>
  );
  
  const handleSwapRecipe = (day, mealType, recipeIndex) => {
    // Pick a random recipe
    const randomRecipe = allRecipes[Math.floor(Math.random() * allRecipes.length)];

    // Clone the recipe plan to modify
    const newRecipePlan = { ...recipePlan };

    // Replace the recipe
    newRecipePlan[day][mealType][recipeIndex] = randomRecipe;

    // Update the state with the new recipe plan
    // Assuming you have a state setter for recipePlan
    setRecipePlan(newRecipePlan);
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Recipe Plan</Text>
      {Object.entries(recipePlan).map(([day, meals], index) => (
      <View key={day} style={styles.dayContainer}>
      {/* ... other code ... */}
      {Object.entries(meals).map(([mealType, recipes]) => 
        renderRecipesForMeal(recipes, mealType, day)
      )}
    </View>
      ))}
      <Button title="Next" onPress={handleNext} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff', // Consider a light, neutral background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // A darker color for main headers
  },
  dayContainer: {
    marginBottom: 30,
    backgroundColor: '#f8f8f8', // A subtle background color for each day section
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000', // Optional shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444', // Slightly lighter than the main title
  },
  mealType: {
    fontSize: 18,
    fontWeight: '600', // A little less bold than the day title
    color: '#555',
    paddingTop: 5,
    paddingBottom: 5,
  },
  recipeContainer: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between recipe details and button
    alignItems: 'center', // Align items vertically
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    // ... other styling ...
  },
  recipeDetails: {
    flex: 1, // Take up available space leaving room for the button
    // ... other styling for recipe details ...
  },
  swapButton: {
    // Styling for the swap button
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '500', // Medium weight for recipe names
    color: '#666',
  },
  // ... any other styles you have ...
});

export default RecipePlanScreen;
