import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ingredientsList = [
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
  

function IngredientsPage({ navigation }) {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((currentSelected) => {
      if (currentSelected.includes(ingredient)) {
        return currentSelected.filter((item) => item !== ingredient);
      } else {
        return [...currentSelected, ingredient];
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          selectedIngredients.includes(item) ? styles.checkboxSelected : null,
        ]}
        onPress={() => toggleIngredient(item)}
      />
      <Text style={styles.ingredient}>{item}</Text>
    </View>
  );
  const navigateToPurchase = () => {
    navigation.navigate('PurchaseScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose Ingredients:</Text>
      <FlatList
        data={ingredientsList}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity style={styles.purchaseButton} onPress={navigateToPurchase}>
        <Text style={styles.purchaseButtonText}>Go to Purchase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around', // Changed to space-around for better distribution of space
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
      },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 18,
    marginLeft: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  checkbox: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
  },
  checkboxSelected: {
    backgroundColor: 'black',
  },
  purchaseButton: {
    backgroundColor: '#000', // Or any color you prefer
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 200, // Set a width for the button
  },
  purchaseButtonText: {
    color: '#fff', // Or any color you prefer
    fontSize: 18,
  },
});

export default IngredientsPage;
