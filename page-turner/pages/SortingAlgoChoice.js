// SortingAlgoChoice.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SortingAlgoChoice = ({ navigation }) => {
  const [bookName, setBookName] = useState('');

  const searchBook = () => {
    // Placeholder for search logic
    console.log('Search for:', bookName);
    navigation.navigate('Swiping', { bookName, sortingAlgorithm: 'TimSort' }); // Example navigation
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

export default SortingAlgoChoice;
