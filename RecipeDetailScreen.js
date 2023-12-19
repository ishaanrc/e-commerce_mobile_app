// RecipeDetailScreen.js
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const RecipeDetailScreen = () => {
    const beefImage = require('./assets/beef-dish.png'); 
  return (
    <ScrollView style={styles.container}>
      <Image source={beefImage} style={styles.image} />
      <Text style={styles.title}>Beef with Mashed Potatoes</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.text}>- 500g beef</Text>
        <Text style={styles.text}>- 4 large potatoes</Text>
        <Text style={styles.text}>- 1/2 cup milk</Text>
        <Text style={styles.text}>- 2 tbsp butter</Text>
        <Text style={styles.text}>- Salt and pepper to taste</Text>
        <Text style={styles.text}>- Optional: Chopped parsley for garnish</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.text}>1. Boil potatoes until soft.</Text>
        <Text style={styles.text}>2. While potatoes are boiling, cook beef to your preference.</Text>
        <Text style={styles.text}>3. Drain potatoes and mash with milk, butter, salt, and pepper.</Text>
        <Text style={styles.text}>4. Serve beef with a side of mashed potatoes.</Text>
        <Text style={styles.text}>5. Garnish with parsley if desired.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Add more styles as needed
});

export default RecipeDetailScreen;
