// Home.js
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import images from '../constants/images';
import Footer from '../components/footer';

const Home = ({ navigation }) => {

  const makeCall = async () => {
    /*const response2 = await fetch("https://actual-terribly-longhorn.ngrok-free.app/similar-books/OL1000307W", {
      method: "GET"
    });
    const text2 = await response2.text();
    console.log(text2);*/

    const response3 = await fetch("https://actual-terribly-longhorn.ngrok-free.app/get-book-id", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: "Book of realityy",
      })
    });
    const text3 = await response3.text();
    console.log(text3);
  }
  
  const handleBegin = () => {
    navigation.navigate('SortingAlgorithmChoice')
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <Text style={styles.description}>
        You're just a swipe away from seeing recommendations based on your favorite book. 
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.customButton}
        onPress={handleBegin}
        >
        <Text style={styles.buttonText}>Begin</Text>
      </TouchableOpacity>

      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  logo: {
    width: 500,
    height: 250,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 25,
    fontFamily: 'Roboto-Italic',
  },
  buttonContainer: {
    marginTop: 10,
  },
  customButton: {
    backgroundColor: '#6D2C2A', 
    paddingVertical: 5, 
    paddingHorizontal: 40, 
    borderRadius: 6, 
    borderColor: '#4F1A15',
    borderWidth: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
})

export default Home
