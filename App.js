import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Ensure these icons are installed
import PreferencesScreen2 from './PreferencesScreen2';
import ShoppingCartScreen from './ShoppingCartScreen';
import RecipePlanScreen from './RecipePlanScreen';
import PurchaseScreen from './PurchaseScreen';
import PurchaseSuccessScreen from './PurchaseSuccessScreen';
import HomePage from './HomePage';
import DetailedScheduleScreen from './DetailedScheduleScreen';
import RecipeDetailScreen from './RecipeDetailScreen';
import LikedRecipesScreen from './LikedRecipesScreen';
import Surprise from './Surprise';

const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="ShoppingCartScreen" component={ShoppingCartScreen} />
        <Stack.Screen name="PreferencesScreen2" component={PreferencesScreen2} />
        <Stack.Screen name="RecipePlanScreen" component={RecipePlanScreen} />
        <Stack.Screen name="PurchaseScreen" component={PurchaseScreen} />
        <Stack.Screen name="PurchaseSuccessScreen" component={PurchaseSuccessScreen} />
        <Stack.Screen name="DetailedScheduleScreen" component={DetailedScheduleScreen} />
        <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} />
        <Stack.Screen name="LikedRecipesScreen" component={LikedRecipesScreen} />
        <Stack.Screen name="Surprise" component={Surprise} />
        
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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

export default App;
