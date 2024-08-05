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
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: transYAnim }] }]}>
        <Text style={styles.title}>Enter a Book Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          onChangeText={setBookName}
          value={bookName}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchBook}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 12,
    borderWidth: 1,
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
  },
});

export default BookSearch;
