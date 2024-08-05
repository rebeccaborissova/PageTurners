// Home.js
import React from 'react'
import { View, Text, StyleSheet, Button, Image, Touchable, TouchableOpacity } from 'react-native';
import images from '../constants/images';

const Home = ({ navigation }) => {
  const makeRequest = async () => {
    const response = await fetch("https://actual-terribly-longhorn.ngrok-free.app/test", {
      method: "GET"
    });
    const text = await response.text();
    console.log(text);

    const response2 = await fetch("https://actual-terribly-longhorn.ngrok-free.app/similar-books/OL1000307W", {
      method: "GET"
    });
    const text2 = await response2.text();
    console.log(text2);

  }

  
  return (
    <View style={styles.container}>
      <Text>Hi</Text>
      <Image source={images.logo} style={styles.logo} />
      <Text style={styles.description}>
        You're just a swipe away from seeing recommendations based on your favorite book. 
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.customButton}
        onPress={makeRequest}
      >
        <Text style={styles.buttonText}>Begin</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 500,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 10,
  },
  customButton: {
    backgroundColor: 'brown', 
    paddingVertical: 5, 
    paddingHorizontal: 40, 
    borderRadius: 6, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
})

export default Home
