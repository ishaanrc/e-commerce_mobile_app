import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { generateShoppingList } from './utils';

const DurationOptions = ['1 week', '2 weeks'];
const DeliveryOptions = ['Delivery', 'Carry Out'];



const PreferencesScreen2 = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState(DeliveryOptions[0]); // New state for delivery option
  const [selectedDuration, setSelectedDuration] = useState(DurationOptions[0]);
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: false, // or true if breakfast is selected by default
    lunch: false,     // same as above
    dinner: false,    // same as above
  });
  
  const handleMealSelection = (meal) => {
    setSelectedMeals({ ...selectedMeals, [meal]: !selectedMeals[meal] });
  };

  const handleNext = () => {
    // Safely access selectedRecipes from route.params with a fallback to an empty array
    const selectedRecipes = route.params?.selectedRecipes || [];
    const recipePlan = generateRecipePlan(selectedRecipes, mealsPerDay, daysPerWeek);
    navigation.navigate('RecipePlanScreen', {
      recipePlan,
      selectedMeals,
      daysPerWeek,
    });
  };
  
  
  
  const calculateTotalMeals = (duration, mealsPerDay, daysPerWeek) => {
    const weeks = duration === '1 month' ? 4 : parseInt(duration); // Assuming 4 weeks for a month
    const totalDays = weeks * daysPerWeek;
    return totalDays * mealsPerDay;
  };
  const getShuffledRandomRecipes = () => {
    // Define your random recipes here
    const randomRecipes = [
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
      // ... add more recipes as needed
    ];
  
  
    // Shuffle the array
    for (let i = randomRecipes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomRecipes[i], randomRecipes[j]] = [randomRecipes[j], randomRecipes[i]];
    }
  
    return randomRecipes;
  };
  const generateRecipePlan = (selectedRecipes, mealsPerDay, daysPerWeek) => {
    let plan = {};
    let totalDays = calculateNumberOfDays(selectedDuration, daysPerWeek);
    let randomRecipes = getShuffledRandomRecipes();
  
    for (let day = 1; day <= totalDays; day++) {
      plan[`Day ${day}`] = {};
  
      Object.keys(selectedMeals).forEach(mealType => {
        if (selectedMeals[mealType]) {
          plan[`Day ${day}`][mealType] = [];
  
          for (let meal = 0; meal < mealsPerDay; meal++) {
            let recipeIndex = (day - 1) * mealsPerDay * Object.keys(selectedMeals).length + Object.keys(selectedMeals).indexOf(mealType) * mealsPerDay + meal;
            let recipe = recipeIndex < selectedRecipes.length ? selectedRecipes[recipeIndex] : randomRecipes[recipeIndex % randomRecipes.length];
            plan[`Day ${day}`][mealType].push(recipe);
          }
        }
      });
    }
  
    return plan;
  };
  
  
  const calculateNumberOfDays = (duration, daysPerWeek) => {
    const weeks = duration === '2 weeks' ? 2 : 1; // Update as per your duration options
    return weeks * parseInt(daysPerWeek);
  };
  const generateRandomRecipe = () => {
    const randomRecipes = [
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
      // ... add more recipes as needed
    ];

    const randomIndex = Math.floor(Math.random() * randomRecipes.length);
    return randomRecipes[randomIndex];
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Create Cart</Text>
        <Text style={styles.subtitle}>Select the option that best fits for you:</Text>
        {DurationOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedDuration === option && styles.selectedOptionButton,
            ]}
            onPress={() => setSelectedDuration(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Select your meals:</Text>
        {Object.keys(selectedMeals).map((meal, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedMeals[meal] && styles.selectedOptionButton,
            ]}
            onPress={() => handleMealSelection(meal)}
          >
            <Text style={styles.optionText}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>How many meals per day would you like to eat at home?</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMealsPerDay}
          value={mealsPerDay}
          keyboardType="numeric"
          placeholder="Enter number of meals"
        />

        <Text style={styles.label}>How many days per week do you want to cook at home?</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDaysPerWeek}
          value={daysPerWeek}
          keyboardType="numeric"
          placeholder="Enter number of days"
        />
 <Text style={styles.label}>Choose your receiving method:</Text>
 {DeliveryOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Next" onPress={handleNext} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedOptionButton: {
    backgroundColor: 'lightgray',
  },
  optionText: {
    fontSize: 18,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  // ... other styles ...
});

export default PreferencesScreen2;
