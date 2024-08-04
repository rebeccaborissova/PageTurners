// Home.js
import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const Home = ({ navigation }) => {
  const makeRequest = async () => {
    try {
      const response = await fetch("https://actual-terribly-longhorn.ngrok-free.app/test", {
          method: "GET"
      })
      const text = await response.text();
      console.log(text);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  return (
    <View style={styles.container}>
      <Text>Hi</Text>
      <Text style={styles.title}>PageTurner</Text>
      <Text style={styles.description}>
        Welcome to PageTurner! Discover a variety of book recommendations based on your favorite book with just a swipe. 
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Begin" onPress={makeRequest} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 20,
  },
})

export default Home
