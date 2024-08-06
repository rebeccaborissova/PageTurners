// BookRecSummary.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookRecSummary = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { likedBooks } = route.params;

  // Working to establish fade-in transition
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>Author: {item.author || 'Unknown'}</Text>
      <Text style={styles.bookSubjects}>Subjects: {item.subjects || 'Not Available'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Liked Books</Text>
        {likedBooks.length > 0 ? (
          <FlatList
            data={likedBooks}
            keyExtractor={(item) => item.id}
            renderItem={renderBookItem}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noBooksText}>No books liked yet!</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TimerResults')}
        >
          <Text style={styles.buttonText}>Sorting Algorithm Timer</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto-Medium',
  },
  bookItem: {
    width: '100%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#555',
  },
  bookSubjects: {
    fontSize: 14,
    color: '#777',
  },
  noBooksText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6D2C2A',
    paddingVertical: 10,
    paddingHorizontal: '23%',
    borderRadius: 6,
    borderColor: '#4F1A15',
    borderWidth: 3,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Black',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default BookRecSummary;
