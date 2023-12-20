import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { FlatList } from 'react-native';

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
  const chefsMenus = [
    {
      id: 'ramsey-3day',
      title: "Gordon Ramsey's 3-day Lunch Menu",
      details: ['Salmon Nicoise', 'Beef Wellington', 'Raspberry Souffle'],
      image: require('./assets/ramsey-menu.png'), 
    },
    {
      id: 'oliver-7day',
      title: "Jamie Oliver's 7-day Gourmet Menu",
      details: ['Roast Chicken', 'Vegetable Curry', 'Seared Tuna Steaks', 'Summer Pudding', 'Risotto', 'Fish Pie', 'Chocolate Tart'],
      image: require('./assets/oliver-menu.png'),
    },
    // ... more menus ...
  ];
  
  
  const renderChefMenu = ({ item }) => (
    <View style={styles.menuCard}>
      <Image source={item.image} style={styles.menuImage} />
      <View style={styles.menuDetails}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        {/* Optionally, if you want to show a list of details */}
        <View style={styles.menuItemList}>
          {item.details.map((detail, index) => (
            <Text key={index} style={styles.menuItem}>{detail}</Text>
          ))}
        </View>
      </View>
    </View>
  );
  
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
  const renderRecipe = ({ item: recipe }) => (
    <View style={styles.recipeCard}>
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
  );

  
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
    {
      id: 3,
      name: 'Grilled Salmon with Asparagus',
      ingredients: ['salmon', 'asparagus', 'lemon', 'olive oil'],
      image: require('./assets/grilled-salmon.png'), // replace with actual image path or uri
    },
    {
      id: 4,
      name: 'Vegan Tofu Stir-fry',
      ingredients: ['tofu', 'broccoli', 'carrot', 'soy sauce'],
      image: require('./assets/tofu-stir-fry.png'), // replace with actual image path or uri
    },
    {
      id: 5,
      name: 'Classic Caesar Salad',
      ingredients: ['romaine', 'croutons', 'parmesan', 'caesar dressing'],
      image: require('./assets/caesar-salad.png'), // replace with actual image path or uri
    },
    {
      id: 6,
      name: 'Margherita Pizza',
      ingredients: ['flour', 'tomatoes', 'mozzarella', 'basil'],
      image: require('./assets/margherita-pizza.png'), // replace with actual image path or uri
    },
   
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
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={30} color="black" />
        <Text style={styles.headerTitle}>Insta Meals</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications" size={30} color="black" />
          <TouchableOpacity 
  onPress={() => navigateToScreen('LikedRecipesScreen', { likedRecipes })} 
  style={styles.iconStyle}
>
  <Ionicons name="heart" size={30} color={activeTab === 'LikedRecipesScreen' ? 'blue' : 'black'} />
</TouchableOpacity>

        </View>
      </View>
    
      <FlatList
        horizontal
        data={filteredRecipes}
        renderItem={renderRecipe}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      />
    
      <View style={styles.sectionDivider}>
        <Text style={styles.sectionTitle}>Social Feed</Text>
      </View>
  
      <View style={styles.socialFeedCard}>
        <Text style={styles.socialFeedText}>John Doe recommended this recipe for you</Text>
        {renderRecipe({ item: recipes[5] })}
      </View>
      <View style={styles.sectionDivider}>
      <Text style={styles.sectionTitle}>Chef's Featured Menus</Text>
    </View>

    {/* Horizontal Carousel for Chef's Featured Menus */}
    <FlatList
      horizontal
      data={chefsMenus}
      renderItem={renderChefMenu}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    />

      {selectedRecipes.length > 0 && (
        <View style={styles.confirmContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
            <Text style={styles.confirmButtonText}>Confirm Selection</Text>
          </TouchableOpacity>
        </View>
      )}

  
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigateToScreen('HomePage')}>
          <Ionicons name="home" size={30} color={activeTab === 'HomePage' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Surprise', { likedRecipes })}>
          <Ionicons name="gift" size={30} color={activeTab === 'Surprise' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('DetailedScheduleScreen')}>
          <FontAwesome5 name="calendar" size={30} color={activeTab === 'DetailedScheduleScreen' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('ShoppingCartScreen')}>
          <FontAwesome5 name="shopping-cart" size={30} color={activeTab === 'ShoppingCartScreen' ? 'blue' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingHorizontal: 10, // Add some padding around the cards
  },
  recipeCard: {
    width: 300, // Adjust the width as necessary
    marginRight: 10, // Add space between cards
    // ... other styles remain unchanged
  },
  recipeImage: {
    width: '100%', // Make sure the image covers the card width
    height: 150, // Adjust height to maintain aspect ratio
    borderRadius: 10, // Optional: if you want rounded corners
    resizeMode: 'cover', // Cover the area without stretching
  },
  recipeDetails: {
    padding: 10, // Add padding inside the details view
    // ... other styles remain unchanged
  },
  likeButton: {
    position: 'absolute', // Position the like button absolutely
    top: 10, // Distance from the top
    right: 10, // Distance from the right
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: for better visibility
    borderRadius: 20, // Rounded corners for the button
    padding: 5, // Padding inside the button
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  confirmContainer: {
    padding: 10,
  },
  confirmButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', // Optional: if you want the text to be bold
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginHorizontal: 10, // Match the horizontal padding from the scroll view
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left', // Align to the left
  },
  socialFeedCard: {
    marginHorizontal: 10, // Match the horizontal padding from the scroll view
    marginVertical: 10, // Add some vertical spacing
  },
  socialFeedText: {
    fontSize: 14,
    fontStyle: 'italic', // Optional: if you want the text to be italic
    marginBottom: 5, // Space between text and the recipe card
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // for Android
    marginHorizontal: 12,
    marginVertical: 20,
  },
  menuImage: {
    width: '100%',
    height: 200, // or any height that works for your layout
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  menuDetails: {
    padding: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuItemList: {
    marginTop: 5,
  },
  menuItem: {
    fontSize: 14,
    color: '#666',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align icons to the end of the view
    // Add some spacing to ensure touch targets are not too close
    paddingRight: 10,
  },

  iconStyle: {
    marginLeft: 15, // Increase space between icons if needed
    padding: 10, // Add padding to increase touchable area
  },

});

  
  export default HomePage;