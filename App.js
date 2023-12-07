import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Ensure these icons are installed

const Stack = createNativeStackNavigator();

function HomePage({ route }) {
  const allergiesFromParams = route.params?.allergies || [];
  const handleLikeRecipe = (recipeId) => {
    // Logic to handle liking a recipe
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


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={30} color="black" />
        <Text style={styles.headerTitle}>Insta Meals</Text>
        <Ionicons name="bell" size={30} color="black" />
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Image source={recipe.image} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <TouchableOpacity onPress={() => handleLikeRecipe(recipe.id)}>
              <FontAwesome5 name="thumbs-up" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="home" size={30} color="black" />
        <Ionicons name="heart" size={30} color="black" />
        <FontAwesome5 name="calendar" size={30} color="black" />
        <FontAwesome5 name="shopping-cart" size={30} color="black" />
      </View>
    </View>
  );
}

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.tagline}>Facilitating Grocery Shopping</Text>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('PhoneNumber')}
        >
          <Text style={styles.getStartedText}>GET STARTED ></Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>ALREADY HAVE AN ACCOUNT? LOG IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function WeightHeightScreen({ navigation }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  return (
    <View style={styles.container}>
      <Text>Please input your most recent weight and height</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('AddressScreen')}
      >
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
}

// New component for the address input
function AddressScreen({ navigation }) {
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  return (
    <View style={styles.container}>
      <Text>Please input your address.</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        keyboardType="numeric"
        value={zipCode}
        onChangeText={setZipCode}
      />
      <TouchableOpacity
  style={styles.continueButton}
  onPress={() => navigation.navigate('PreferencesScreen')}
>
  <Text style={styles.continueText}>CONTINUE</Text>
</TouchableOpacity>
    </View>
  );
}

function PhoneNumberScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Enter your phone number</Text>
      <Text style={styles.description}>
        Enter your number to identify yourself. We'll send you a code to verify your account.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="YOUR PHONE NUMBER"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Text style={styles.termsText}>
        By continuing you confirm that you have read and accepted our Terms and Privacy Policy.
      </Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('WeightHeight')}
      >
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
}


function PreferencesScreen({ navigation }) {
  const [budget, setBudget] = useState('');
  const [allergies, setAllergies] = useState('');
  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [macros, setMacros] = useState('');
  const onNextPress = () => {
    // Pass the allergies state to the HomePage component
    const allergiesArray = allergies.split(',').map(allergy => allergy.trim().toLowerCase());
  navigation.navigate('HomePage', { allergies: allergiesArray });
  };

  return (
    <View style={styles.container}>
      <Text>Please complete the following 5 categories to tailor the experience for you or your family.</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Budget (per month)"
        keyboardType="number-pad"
        value={budget}
        onChangeText={setBudget}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Allergies"
        value={allergies}
        onChangeText={setAllergies}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Likes"
        value={likes}
        onChangeText={setLikes}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Dislikes"
        value={dislikes}
        onChangeText={setDislikes}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Macronutrient Preferences"
        value={macros}
        onChangeText={setMacros}
      />
      
      <TouchableOpacity
        style={styles.continueButton}
        onPress={onNextPress}
      >
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
}





const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="WeightHeight" component={WeightHeightScreen} />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain', // Ensures the logo is scaled correctly within the given dimensions
  },
  tagline: {
    fontSize: 16,
    marginBottom: 24,
    fontFamily: 'Arial', // Specify your font if different
  },
  getStartedButton: {
    position: 'absolute',
    bottom: 50,
    width: '90%', // Adjust the width as needed
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#000', // Black background for the button
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 8,
    padding: 10,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 24,
  },
  loginText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
    marginBottom: 16, // add some space between the text and the bottom of the screen
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  continueButton: {
    width: '90%',
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
