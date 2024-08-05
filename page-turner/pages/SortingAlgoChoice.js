// SortingAlgoChoice.js
import React, { useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Animated } from 'react-native';
import images from '../constants/images';

const SortingAlgoChoice = ({ navigation }) => {
  // working to est. fade-down transition
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transYAnim = useRef(new Animated.Value(-70)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // making button appear
      duration: 1000,
      useNativeDriver: true, // improve performance
    }).start();

    Animated.timing(transYAnim, {
      toValue: 0, // moving from position -50 to 0
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, transYAnim]);

  return (
    <View style={styles.selection}>
    <Image source = {images.logo} style={styles.logo} />


    {/* animated view = special View screen w/ animations; style takes in array of styles */}
    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: transYAnim }] }]}>
      <Text style={styles.description}>
        First, select your sorting algorithm:
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('BookSearch')}>
          <Text style={styles.buttonText}> Quick Sort </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('BookSearch')}>
          <Text style={styles.buttonText}> Tim Sort </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  </View>
  )
}

const styles = StyleSheet.create({
  selection: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    marginBottom: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 25,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  customButton: {
    backgroundColor: 'brown',
    paddingVertical: 10,
    paddingHorizontal: '23%',
    borderRadius: 6,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  }
})

export default SortingAlgoChoice