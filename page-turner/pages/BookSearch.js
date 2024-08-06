import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import images from '../constants/images'; 
import Footer from '../components/footer';

const BookSearch = ({ route, navigation }) => {
  const [bookName, setBookName] = useState('');

  // const BookSearch = ({ route, navigation }) => {
  const { sortingAlgorithm } = route.params;  // recieving choice of sorting algo

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
    navigation.navigate('Swiping', { book_id: book_id, sortingAlgorithm });
  }
  
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
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
      < Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 40,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    marginBottom: 20,
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
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: 250, 
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  searchIcon: {
    width: 90,
    height: 50,
    marginLeft: -15,
  },
});

export default BookSearch;
