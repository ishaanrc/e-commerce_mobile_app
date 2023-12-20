import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput, Image,  TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Surprise({ navigation }) {
    const [occasion, setOccasion] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [budget, setBudget] = useState('');

  const navigateToScreen = (screenName, params = {}) => {
    navigation.navigate(screenName, params);
  };
  const dummyRecipes = [
    {
      id: 1,
      name: 'Pasta Primavera',
      costPerPerson: 5,
      serves: 4,
      image: require('./assets/pasta.png'),
    },
    {
      id: 2,
      name: 'Chicken Curry',
      costPerPerson: 7,
      serves: 3,
      image: require('./assets/curry.png'),
    },
  ];
  
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const surpriseMe = () => {
    // Directly navigate to the RecipeDetailScreen without selecting a recipe
    navigateToScreen('RecipeDetailScreen');
};
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={30} color="black" />
        <Text style={styles.headerTitle}>Insta Meals</Text>
        <TouchableOpacity onPress={() => navigateToScreen('LikedRecipesScreen')}>
          <Ionicons name="gift" size={30} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Surprise Cooking!</Text>
        
        <Text style={styles.label}>Special occasion selection</Text>
        <TextInput
          style={styles.input}
          onChangeText={setOccasion}
          value={occasion}
          placeholder="Enter the occasion"
        />
        
        <Text style={styles.label}>Number of people</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNumberOfPeople}
          value={numberOfPeople}
          placeholder="Enter number of people"
          keyboardType="numeric"
        />
        
        <Text style={styles.label}>Budget for this order</Text>
        <TextInput
          style={styles.input}
          onChangeText={setBudget}
          value={budget}
          placeholder="Enter your budget"
          keyboardType="numeric"
        />
        
        {/* Surprise Image */}
        <Image source={require('./assets/cheer.png')} style={styles.surpriseImage} />
        
        <TouchableOpacity style={styles.surpriseButton} onPress={surpriseMe}>
        <Text style={styles.surpriseButtonText}>SURPRISE ME</Text>
      </TouchableOpacity>
      {selectedRecipe && (
        <View style={styles.recipeCard}>
          <Image source={selectedRecipe.image} style={styles.recipeImage} />
          <Text style={styles.recipeName}>{selectedRecipe.name}</Text>
          {/* Other details about the selected recipe */}
        </View> )}
      </View>

      {/* Footer navigation icons would be similar to your HomePage */}
      <View style={styles.footer}>
        {/* ... footer icons ... */}
      </View>
    </View>
     </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  surpriseImage: {
    width: '100%',
    height: 200, // Adjust as needed
    resizeMode: 'contain',
    marginVertical: 20,
  },
  surpriseButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  surpriseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    // Similar to your HomePage footer
  },
  // Add additional styling as needed
});

export default Surprise;
