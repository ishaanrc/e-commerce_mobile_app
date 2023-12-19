// HomePage.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

function HomePage({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('HomePage');
  const allergiesFromParams = route.params?.allergies || [];
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const navigateToScreen = (screenName, params = {}) => {
    setActiveTab(screenName);
    navigation.navigate(screenName, params);
  };
  const goToDetailedSchedule = () => {
    navigation.navigate('DetailedScheduleScreen');
  };
  const toggleRecipeSelection = (recipe) => {
    setSelectedRecipes((currentSelectedRecipes) => {
      if (currentSelectedRecipes.find((r) => r.id === recipe.id)) {
        return currentSelectedRecipes.filter((r) => r.id !== recipe.id);
      } else {
        return [...currentSelectedRecipes, recipe];
      }
    });
  };
  const [likedRecipes, setLikedRecipes] = useState([]);
  const handleLikeRecipe = (recipe) => {
    setLikedRecipes((currentLikedRecipes) => {
      if (currentLikedRecipes.some(r => r.id === recipe.id)) {
        return currentLikedRecipes.filter((r) => r.id !== recipe.id);
      } else {
        return [...currentLikedRecipes, recipe];
      }
    });
  };
  
  
  // When navigating to LikedRecipesScreen
  const goToLikedRecipes = () => {
    const likedRecipesDetails = recipes.filter(recipe => likedRecipes.includes(recipe.id));
    navigation.navigate('LikedRecipesScreen', { likedRecipes: likedRecipesDetails });
  };
  


  // Placeholder data for recipes
  const recipes = [
    {
      id: 1,
      name: 'Beef with mash potatoes and cabbage',
      ingredients: ['beef', 'potatoes', 'cabbage'],
      image: require('./assets/beef-dish.png'), // replace with actual image path or uri
    },
    {
      id: 2,
      name: 'Chicken Burrito (rice, beans, onion)',
      ingredients: ['chicken', 'rice', 'beans', 'onion'],
      image: require('./assets/chicken-burrito.png'), // replace with actual image path or uri
    },
    // ... more recipes
  ];

  // Filter recipes that do not contain any of the user's allergens
  const filteredRecipes = recipes.filter(recipe =>
    !recipe.ingredients.some(ingredient => allergiesFromParams.includes(ingredient.toLowerCase()))
  );

  const handleConfirmSelection = () => {
    // Navigate to PreferencesScreen with the selected recipes
    navigation.navigate('PreferencesScreen2', { selectedRecipes });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={30} color="black" />
        <Text style={styles.headerTitle}>Insta Meals</Text>
        <Ionicons name="notifications" size={30} color="black" />
      </View>
      <ScrollView style={styles.scrollView}>
        {filteredRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <TouchableOpacity onPress={() => toggleRecipeSelection(recipe)}>
              <Image source={recipe.image} style={styles.recipeImage} />
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Ionicons
                  name={selectedRecipes.some((r) => r.id === recipe.id) ? 'checkbox' : 'square-outline'}
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLikeRecipe(recipe)} style={styles.likeButton}>
      <FontAwesome5 
        name="thumbs-up" 
        size={24} 
        color={likedRecipes.some(r => r.id === recipe.id) ? 'darkblue' : 'black'} 
      />
    </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {selectedRecipes.length > 0 && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
          <Text style={styles.confirmButtonText}>Confirm Selection</Text>
        </TouchableOpacity>
      )}
      <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigateToScreen('HomePage')}>
          <Ionicons name="home" size={30} color={activeTab === 'HomePage' ? 'blue' : 'black'} />
        </TouchableOpacity>
       <TouchableOpacity onPress={() => navigateToScreen('LikedRecipesScreen', { likedRecipes })}>
          <Ionicons name="heart" size={30} color={activeTab === 'LikedRecipesScreen' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('DetailedScheduleScreen')}>
          <FontAwesome5 name="calendar" size={30} color={activeTab === 'DetailedScheduleScreen' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('ShoppingCartScreen')}>
          <FontAwesome5 name="shopping-cart" size={30} color={activeTab === 'ShoppingCartScreen' ? 'blue' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // This will give space around each icon evenly
        alignItems: 'center',
        width: '100%', // Make sure the footer is as wide as the screen
        paddingVertical: 10, // Add some vertical padding
      },
      
      scrollView: {
        paddingBottom: 20,
      },
      recipeCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 20, // Adjust for status bar height if necessary
      },
      headerTextContainer: {
        alignItems: 'center',
      },
      headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerSubtitle: {
        fontSize: 12,
        color: 'grey',
      },
      recipeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      recipeDetails: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      },
      likeButton: {
        // Style for the like button (thumbs up)
        marginLeft: 10,
      },
      confirmButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      confirmButtonText: {
        color: 'white',
        fontSize: 16,
      },
      button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
});

export default HomePage;
