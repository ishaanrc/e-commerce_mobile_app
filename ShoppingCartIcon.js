import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function ShoppingCartIcon({ navigation }) {
  // You can replace this with your actual image when you have one
  const shoppingCartIcon = require('./assets/logo.png');
  const handleBuildCartPress = () => {
    navigation.navigate('Ing');
  };
  const allIngredients = [
    'Salmon Fillets',
    'Ground Beef',
    'Bacon',
    'Pork Chops',
    'Tofu',
    'Chickpeas',
    'Lentils',
    'Quinoa',
    'Brown Rice',
    'Feta Cheese',
    'Cheddar Cheese',
    'Mozzarella Cheese',
    'Greek Yogurt',
    'Olive Oil',
    'Coconut Oil',
    'Balsamic Vinegar',
    'Soy Sauce',
    'Maple Syrup',
    'Pasta',
    'Spaghetti',
    'Marinara Sauce',
    'Pesto',
    'Flour',
    'Sugar',
    'Baking Soda',
    'Baking Powder',
    'Yeast',
    'Chocolate Chips',
    'Vanilla Extract',
    'Eggs',
    'Milk',
    'Butter',
    'Cream',
    'Avocados',
    'Mushrooms',
    'Zucchini',
    'Eggplant',
    'Bell Peppers',
  
  ];
  const calculateRandomIngredients = (numIngredients = 15) => {
    const selectedIngredients = {};
    const shuffledIngredients = [...allIngredients].sort(() => 0.5 - Math.random());
  
    for (let i = 0; i < numIngredients; i++) {
      const ingredient = shuffledIngredients[i];
      const quantity = Math.floor(Math.random() * 4) + 1;  // Random quantity between 1 and 4
      selectedIngredients[ingredient] = quantity;
    }
  
    return selectedIngredients;
  };
  const handleNext = () => {
    const ingredients = calculateRandomIngredients(); // Default is 5, change as needed
    navigation.navigate('PreferencesScreen2');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={shoppingCartIcon} style={styles.image} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBuildCartPress}>
    <Text style={styles.buttonText}>Build my own cart</Text>
  </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Create Shopping Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // Change this to your preferred background color
  },
  imageContainer: {
    marginBottom: 32, // Adjust the spacing as needed
  },
  image: {
    width: 100, // Adjust your image size as needed
    height: 100, // Adjust your image size as needed
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#000', // Your preferred button background color
    paddingVertical: 12,
    paddingHorizontal: 20, // Adjust padding as needed
    borderRadius: 4,
    marginBottom: 8,
    width: 250, // Set a fixed width for all buttons
    justifyContent: 'center', // This will center the button text vertically
    alignItems: 'center', // This will center the button text horizontally
  },
  buttonText: {
    color: '#fff', // Your preferred button text color
    fontSize: 18,
    textAlign: 'center', // Ensure text is centered within the button
  },
});

export default ShoppingCartIcon;
