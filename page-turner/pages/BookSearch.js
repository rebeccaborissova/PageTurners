import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import images from '../constants/images'; // Assuming you have an images folder

const BookSearch = ({ navigation }) => {
  const [bookName, setBookName] = useState('');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transYAnim = useRef(new Animated.Value(-70)).current;

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

  const searchBook = async () => {
    const response = await fetch("https://actual-terribly-longhorn.ngrok-free.app/get-book-id", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: bookName,
      }),
    });
    const book_id = JSON.parse(await response.text()).id;
    console.log('Searching for:', book_id);
    navigation.navigate('Swiping', { book_id: book_id });
// BookSearch.js 
import React, { useRef, useEffect, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import images from '../constants/images';

const BookSearch = ({ route, navigation }) => {
  // recieving choice of sorting algo
  const { sortingAlgorithm } = route.params;

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


  const [bookName, setBookName] = useState('');

  const searchBook = () => {
    console.log('Search for:', bookName);
    navigation.navigate('Swiping', { bookName, sortingAlgorithm: 'TimSort' }); // Example navigation
  };

  return (
    <View style={styles.container}>
      <Image source = {images.logo} style={styles.logo} />

      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: transYAnim }] }]}>
        <Text style={styles.title}>Enter a book title: </Text>
        <View style =  {styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            onChangeText={setBookName}
            value={bookName}
          />
          <TouchableOpacity onPress = {searchBook}>
            <Image source = {images.searchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top
    alignItems: 'center',
    width: '100%',
    paddingVertical: 40, // Add vertical padding to position content higher
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
<<<<<<< HEAD
=======
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
    paddingHorizontal: 20,
>>>>>>> refs/remotes/origin/main
  },
  input: {
    height: 40,
    width: 250, // Adjust width as needed
    marginVertical: 10,
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  searchButton: {
    backgroundColor: 'brown',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
=======
    padding: 10,
    borderRadius: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  searchIcon: {
    width: 90,
    height: 50,
    marginLeft: -15,
>>>>>>> refs/remotes/origin/main
  },
});

export default BookSearch;
