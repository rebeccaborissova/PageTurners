import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import images from '../constants/images';
import Footer from '../components/footer';

const Home = ({ navigation }) => { 
  // navigate to sorting algorithm selection page
  const handleBegin = () => {
    navigation.navigate('SortingAlgorithmChoice')
  };

  // displays home page description & pageturner logo
  // navigation when user presses begin button
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <Text style={styles.description}>
        Swipe to toss away, tap the heart to love, and unlock new book recommendations!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} onPress={handleBegin}>
          <Text style={styles.buttonText}>Begin</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',     // cream background color
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
    backgroundColor: '#6D2C2A',     // burgundy button color
    paddingVertical: 5, 
    paddingHorizontal: 40, 
    borderRadius: 6, 
    borderColor: '#4F1A15',       // darker burgundy border color
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
