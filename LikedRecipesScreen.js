import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

function LikedRecipesScreen({ route }) {
    const likedRecipes = route.params?.likedRecipes || [];

  // Render each recipe item
  const renderRecipe = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={item.image} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{item.name}</Text>
      {/* Add more details as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Recipes</Text>
      <FlatList
        data={likedRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeCard: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1, // for Android shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 10,
    alignItems: 'center',
  },
  recipeImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '500',
  },
  // Add more styles as needed
});

export default LikedRecipesScreen;
