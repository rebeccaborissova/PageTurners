// SortingAlgoChoice.js
import React from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import images from '../constants/images';

const SortingAlgoChoice = ({ navigation }) => (
  <View style={styles.selection}>
    <Image source = {images.logo} style={styles.logo} />
    <View style = {styles.contentContainer}>
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
    </View> 
  </View>
)

const styles = StyleSheet.create({
  selection: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    paddingTop: 100,
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