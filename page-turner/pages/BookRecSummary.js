import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import images from '../constants/images';
import Footer from '../components/footer';

const BookRecSummary = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { likedBooks } = route.params;
  const { sortingAlgorithm } = route.params; 

  // Working to establish fade-in transition
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleToTimerResults = () => {
    navigation.navigate('TimerResults', { sortingAlgorithm });
  }

  const handleReturnToSwiping = () => {
    navigation.navigate('Swiping', { likedBooks, sortingAlgorithm });
  }

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={images.heart} style={styles.heartImage} />
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>Author: {item.author || 'Unknown'}</Text>
      <Text style={styles.bookSubjects}>Subjects: {item.subjects || 'Not Available'}</Text>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.finishedText}>Finished? </Text>
      <Text style={styles.subFinishedText}>View amount of time it took to sort.</Text>
      <TouchableOpacity style={styles.timerButton} onPress={handleToTimerResults}>
        <Text style={styles.sortingAlgoText}>Timer Results</Text>
      </TouchableOpacity>
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
          style={styles.returnButton}
          onPress={handleReturnToSwiping}
        >
          <Text style={styles.returnButtonText}>Return to Swiping</Text>
        </TouchableOpacity>
      </Animated.View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5E6E1',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishedText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  subFinishedText: {
    fontSize: 14,
    textAlign: 'center',
  
  },
  timerButton: {
    backgroundColor: '#6D2C2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderColor: '#4F1A15',
    borderWidth: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sortingAlgoText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
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
    position: 'relative', // Ensure relative positioning for absolute children
  },
  heartImage: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
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
  returnButton: {
    backgroundColor: '#6D2C2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderColor: '#4F1A15',
    borderWidth: 3,
    alignSelf: 'center',
    marginTop: 20,

  },
  returnButtonText: {
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
