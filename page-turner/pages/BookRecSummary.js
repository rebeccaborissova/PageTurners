// BookRecSummary.js
/*import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Animated } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const BookRecSummary = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transYAnim = useRef(new Animated.Value(-70)).current;
  const navigation = useNavigation();
  const route = useRoute();

  // receiving choices of likedBooks from BookSearch and sortingAlgo from SortingAlgoChoice
  const { likedBooks } = route.params
  const { sortingAlgorithm } = route.params;  

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

  const handleToTimerResults = () => {
    navigation.navigate('TimerResults', { sortingAlgorithm });
  }
  
  const handleReturnToSwiping = () => {
    navigation.navigate('Swiping', { likedBooks, sortingAlgorithm });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.finishedText}>Finished?</Text>
      <Text style={styles.finishedSubtitle}>View time it took to sort.</Text>
      <FlatList
        data={likedBooks}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookText}>{item.title}</Text>
          </View>
        )}
      /> 

      <TouchableOpacity style={styles.timerButton} onpress={handleToTimerResults}>
          <Text style={styles.sortingAlgoText}>Sorting Algorithm Results</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title="Return to Swiping" onPress={handleReturnToSwiping} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishedText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 100,
  },
  finishedSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: -95,
  },
  timerButton: {
    backgroundColor: '#6D2C2A',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 6,
    borderColor: '#4F1A15',
    borderWidth: 3,
    marginBottom: 450,
  },
  sortingAlgoText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 100,
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 200,
  },
})

export default BookRecSummary*/

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookRecSummary = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transYAnim = useRef(new Animated.Value(-70)).current;
  const navigation = useNavigation();
  const route = useRoute();

  // Hardcoded example books
  const likedBooks = [
    { title: 'The Great Gatsby' },
    { title: 'To Kill a Mockingbird' },
    { title: '1984' },
    { title: 'Moby Dick' },
  ];

  // const { likedBooks } = route.params;
  const { sortingAlgorithm } = route.params; 
  console.log('Liked books: ', likedBooks);

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

  const handleToTimerResults = () => {
    navigation.navigate('TimerResults', { sortingAlgorithm });
  };

  const handleReturnToSwiping = () => {
    navigation.navigate('Swiping', { likedBooks, sortingAlgorithm });
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.finishedText}>Finished?</Text>
        <Text style={styles.finishedSubtitle}>View sorting algorithms.</Text>

        <TouchableOpacity style={styles.timerButton} onPress={handleToTimerResults}>
          <Text style={styles.sortingAlgoText}>Sorting Algo</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Saved Book Recommendations</Text>
      </View>

      <View style={styles.booksContainer}>
        <FlatList
          data={likedBooks}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <View style={styles.bookDetails}>
                <Text style={styles.bookText}>{item.title}</Text>
              </View>
              <View style={styles.circle}></View>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.returnButton} onPress={handleReturnToSwiping}>
        <Text style={styles.returnButtonText}>Return to Swiping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5E6E1',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 100, // Adjust this value to lower the container
    
  },
  finishedText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  finishedSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  timerButton: {
    backgroundColor: '#6D2C2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderColor: '#4F1A15',
    borderWidth: 3,
    marginBottom: 20,
  },
  sortingAlgoText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  booksContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#B0B0B0', // Gray background
    borderRadius: 20,
    paddingVertical: 10,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  bookDetails: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
  },
  bookText: {
    fontSize: 16,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
  },
  returnButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 20, // Adds some margin from the bottom of the screen
    alignSelf: 'center', // Centers the button horizontally
  },
  returnButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BookRecSummary;
