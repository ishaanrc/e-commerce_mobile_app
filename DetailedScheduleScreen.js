import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const calImage = require('./assets/calender-icon.png'); 
const DetailedScheduleScreen = ({ navigation }) => {
  const selectedDateDetails = {
    date: "Tuesday December 19th",
    meal: "Beef with mash potatoes and cabbage",
  };
  const navigateToRecipeDetail = () => {
    navigation.navigate('RecipeDetailScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Detail Schedule</Text>
        <Ionicons name="notifications" size={30} color="black" />
      </View>
      <Image 
        source={calImage} 
        style={styles.calendarImage}
        resizeMode="contain"
      />
      <Text style={styles.dateText}>Today: {selectedDateDetails.date}</Text>
      <Text style={styles.mealText}>Dinner: {selectedDateDetails.meal}</Text>
      <TouchableOpacity style={styles.viewRecipeButton} onPress={navigateToRecipeDetail}>
        <Text style={styles.viewRecipeButtonText}>VIEW RECIPE</Text>
      </TouchableOpacity>
      {/* Include the footer with icons if necessary */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40, // Account for status bar height
    paddingHorizontal: 20,
    width: '100%',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  calendarImage: {
    width: '80%',
    height: 200,
    marginVertical: 20,
  },
  dateText: {
    fontSize: 18,
    marginBottom: 5,
  },
  mealText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  viewRecipeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  viewRecipeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  // Add more styles as needed
});

export default DetailedScheduleScreen;
