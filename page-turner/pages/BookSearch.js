// BookSearch.js 
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BookSearch = ({ navigation }) => {
  /*const makeRequest = async () => {
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
    }*/
  

  const [bookName, setBookName] = useState('');

  const searchBook = () => {
    // Placeholder for search logic
    console.log('Search for:', bookName);
    navigation.navigate('Swiping'); // Example navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a book title</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={setBookName}
        value={bookName}
      />
      <Button title="Search" onPress={searchBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default BookSearch;