import React, { useRef, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Animated } from 'react-native';
import images from '../constants/images';
import Footer from '../components/footer';

const SortingAlgoChoice = ({ navigation }) => {
  // hooks for fade-in and swipe-up animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transYAnim = useRef(new Animated.Value(-70)).current;

  // runs animations
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(transYAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, transYAnim]);

  // navigate to page where user inputs book title for search to API call
  const sortingChoice = (sortingAlgo) => {
    navigation.navigate('BookSearch', { sortingAlgo: sortingAlgo});
  };

  // displays a message to user describing to choose a prediction for faster sorting algo
  return (
    <View style={styles.selection}>
      <Image source = {images.logo} style={styles.logo} />

      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: transYAnim }] }]}>
        <Text style={styles.title}>
          First, predict which sorting algorthim will run faster to load your recommendations:
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => sortingChoice('Radix Sort')}>
            <Text style={styles.buttonText}> Radix Sort </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customButton}
            onPress={() => sortingChoice('Tim Sort')}>
            <Text style={styles.buttonText}> Tim Sort </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <Footer />
  </View>
  )
}

// styling
const styles = StyleSheet.create({
  selection: {
    flex: 1,
    backgroundColor: '#F5E6E1',       // cream color background
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    fontFamily: 'Roboto-Medium',
  },
  customButton: {
    backgroundColor: '#6D2C2A',        // burgundy button color
    paddingVertical: 10,
    paddingHorizontal: '23%',
    borderRadius: 6,
    marginVertical: 10,
    borderColor: '#4F1A15',
    borderWidth: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Black',
  }
});

export default SortingAlgoChoice