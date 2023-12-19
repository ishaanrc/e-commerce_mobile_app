import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

const RecipePlanScreen = ({ route, navigation }) => {
  const { recipePlan } = route.params; // Assume recipePlan is now structured by day and meal type

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

  const renderRecipesForMeal = (recipes, mealType) => (
    <View>
      <Text style={styles.mealType}>{mealType.toUpperCase()}</Text>
      {recipes.map((recipe, index) => (
        <View key={index} style={styles.recipeContainer}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          {/* Render other details of the recipe as needed */}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Recipe Plan</Text>
      {Object.entries(recipePlan).map(([day, meals], index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayTitle}> {day}</Text>
          {Object.entries(meals).map(([mealType, recipes]) => 
            renderRecipesForMeal(recipes, mealType)
          )}
        </View>
      ))}
      <Button title="Next" onPress={handleNext} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... existing styles ...
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  mealType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 5,
  },
  // ... more styles as needed ...
});

export default RecipePlanScreen;
