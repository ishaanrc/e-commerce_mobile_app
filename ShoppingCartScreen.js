import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

const ShoppingCartScreen = ({ route , navigation }) => {
  const { ingredients } = route.params;

  const renderIngredient = (ingredient, quantity) => (
    <View key={ingredient} style={styles.ingredientContainer}>
      <Text style={styles.ingredientName}>{ingredient}</Text>
      <Text style={styles.ingredientQuantity}>{quantity}x</Text>
    </View>
  );
  const handleNextPress = () => {
    // Here we navigate to the PurchaseScreen
    // You would pass any needed parameters using the second argument of navigate
    navigation.navigate('PurchaseScreen', {
      // If there are parameters to pass, they would go here, e.g.:
      // supermarket: "Walmart Sagamore Park",
      // totalOrder: 137.50,
      // budget: 150.00,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {Object.entries(ingredients).map(([ingredient, quantity]) => 
        renderIngredient(ingredient, quantity)
      )}
      <Button
        title="Next"
        onPress={handleNextPress} // Handle the press event
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  ingredientName: {
    fontSize: 18,
    color: '#333',
  },
  ingredientQuantity: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  // Add more styles as needed
});

export default ShoppingCartScreen;
