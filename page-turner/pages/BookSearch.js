import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Image, Alert, ActivityIndicator } from 'react-native';
import images from '../constants/images'; 
import Footer from '../components/footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { localhost } from '../constants/url';

const BookSearch = () => {
  // hooks for navigation and route parameters
  const navigation = useNavigation();
  const route = useRoute();
  const { sortingAlgo, fetchingError } = route.params;

  // book title input and search status state hooks
  const [bookName, setBookName] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // refs for animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transYAnim = useRef(new Animated.Value(-70)).current;

  // display Alert banner for error when book not fetched 
  if(fetchingError) {
    Alert.alert("Could not find recommendations", "There was an issue finding book recommendations for the book you requested. Please try a different book");
  }
 
  // runs animations: fade-in & slide-up
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
  
  // API call for when user inputs a book title
  const searchBook = async () => {
    setIsSearching(true);
    try {
      // POST request to server
      const response = await fetch(`http://${localhost}:5000/get-book-id`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: bookName,
        }),
      });

      // error handling for network response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // navigation to swiping screen after book id found w/ API call
      if (data.id) {
        const bookId = data.id;
        navigation.navigate('Swiping', { bookId: bookId, sortingAlgo: sortingAlgo, shouldFetch: true });
      } else {
        Alert.alert("Error", "Book not found. Please try again.");
      }
      
    } catch (error) {
      // alert banner showing error for when book is not in dataset
      Alert.alert("Error finding book", "This book does not exist in our records. Please try again");
    } finally {
      setIsSearching(false);
    }
  }
  
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: transYAnim }] }]}>
        <Text style={styles.title}>Enter a book title: </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={setBookName}
            value={bookName}
          />
          <TouchableOpacity onPress={searchBook} disabled={isSearching}>
            <Image source={images.searchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        {isSearching && (
          <View style={styles.searchingContainer}>
            <ActivityIndicator size="small" color="#6D2C2A" />
            <Text style={styles.searchingText}>Searching...</Text>
          </View>
        )}
      </Animated.View>
      <Footer />
    </View>
  );
};

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',   // cream background color
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
  searchingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchingText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
});

export default BookSearch;