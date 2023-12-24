import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
const walmartImage = require('./assets/walmart.png'); 

const PurchaseScreen = ({ navigation }) => { 
  // Hardcoded values for the purpose of this example
  const supermarket = "Walmart Sagamore Park";
  const totalOrder = 137.50;
  const budget = 150.00;
  const savings = budget - totalOrder;
  // const walmartImage = require('/assets/walmart.png');


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>InstaMeals</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.orderTitle}>Order Purchase</Text>
        <Text style={styles.infoText}>
          The nearest supermarket with the cheapest prices for your products is:
        </Text>
        <Text style={styles.supermarketName}>{supermarket}</Text>
        <Image source={walmartImage} style={styles.logo} />
        <Text style={styles.dealText}>
          The total for your order is: ${totalOrder.toFixed(2)}, 
          ${savings.toFixed(2)} below your weekly budget. You made a great deal!
        </Text>
        <TouchableOpacity
  style={styles.purchaseButton}
  onPress={() => navigation.navigate('PurchaseSuccessScreen')} // Add navigation here
>
  <Text style={styles.purchaseButtonText}>Purchase Order</Text>
</TouchableOpacity>

      </View>
      <View style={styles.footer}>
        {/* Footer navigation icons or buttons */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  supermarketName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
  dealText: {
    fontSize: 16,
    marginBottom: 20,
  },
  purchaseButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    // Add styles for your footer here
  },
  // Add more styles as needed
});

export default PurchaseScreen;
