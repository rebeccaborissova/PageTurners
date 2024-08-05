// SortingAlgoChoice.js
import React, { useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import images from '../constants/images';
import Footer from '../components/footer';

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

  const sortingChoice = (sortAlgoChoice) => {
    navigation.navigate('BookSearch', { sortingAlgorthim: sortAlgoChoice});
  };

  return (
    <View style={styles.selection}>
      <Image source = {images.logo} style={styles.logo} />

      {/* animated view = special View screen w/ animations; style takes in array of styles */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: transYAnim }] }]}>
        <Text style={styles.title}>
          First, select your sorting algorithm:
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => sortingChoice('QuickSort')}>
            <Text style={styles.buttonText}> Quick Sort </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customButton}
            onPress={() => sortingChoice('TimSort')}>
            <Text style={styles.buttonText}> Tim Sort </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Footer />
  </View>
  )
}

const styles = StyleSheet.create({
  selection: {
    flex: 1,
    backgroundColor: '#F5E6E1',
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
    backgroundColor: '#6D2C2A',
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