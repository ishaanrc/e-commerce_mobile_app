import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PurchaseSuccessScreen = () => {
    const navigation = useNavigation();
  const deliveryDate = "January 6, 2024";
  const deliveryTime = "2:00 PM";

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.celebrationView,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim
          }
        ]}
      >
        <Image
          source={require('./assets/tick.png')}
          style={styles.tickImage}
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={styles.successMessage}>Order Successful!</Text>
      <Text style={styles.deliveryInfo}>Estimated Delivery:</Text>
      <Text style={styles.deliveryDate}>{deliveryDate} at {deliveryTime}</Text>
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('HomePage')} // Use your home screen's route name
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deliveryInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  deliveryDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  celebrationView: {
    width: 100,
    height: 100,
    backgroundColor: 'gold',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '30%',
  },
  tickImage: {
    width: '50%',
    height: '50%',
  },
  // Add more styles as needed
});

export default PurchaseSuccessScreen;
