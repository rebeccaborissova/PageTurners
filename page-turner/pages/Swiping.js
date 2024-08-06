import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import images from '../constants/images';
import { useNavigation, useRoute } from '@react-navigation/native';

const Swiping = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId, sortingAlgo, shouldFetch } = route.params;
  console.log(bookId);

  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortTimes, setSortTimes] = useState({ timSort: 0, quickSort: 0 });
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setLoadingMessages([]);
      const messages = [
        "Flipping through pages...",
        "Analyzing books...",
        "Curating the best reads...",
        "Almost done..."
      ];
      messages.forEach((message, index) => {
        setTimeout(() => {
          setLoadingMessages(prev => [...prev, message]);
        }, index * 12000);
      });

      try {
        const response = await fetch(`https://actual-terribly-longhorn.ngrok-free.app/similar-books/${bookId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        let data = await response.json();
        console.log("Received data:", JSON.stringify(data, null, 2));

        const similarBooks = data.similar_books.map(item => ({
          id: item.book.id,
          title: item.book.title,
          author: item.book.authors || 'Unknown Author',
          subjects: Array.isArray(item.book.subjects) ? item.book.subjects.join(', ') : (item.book.subjects || 'No subjects available')
        }));

        setBooks(similarBooks);
        setSortTimes({
          timSort: data.tim_sort_time,
          radixSort: data.radix_sort_time
        });
      } catch (error) {
        navigation.navigate("BookSearch", { sortingAlgo: sortingAlgo, fetchingError: true });
      } finally {
        setTimeout(() => setLoading(false), messages.length * 1000);
      }
    };
    if(shouldFetch) fetchBooks();
  }, [bookId]);

  const addLikedBook = useCallback((book) => {
    setLikedBooks((prevLikedBooks) => {
      if (!prevLikedBooks.some(likedBook => likedBook.id === book.id)) {
        return [...prevLikedBooks, book];
      }
      return prevLikedBooks;
    });
  }, []);

  const handleSwipedAll = useCallback(() => {
    console.log('All cards swiped');
    console.log('Liked Books:', likedBooks);
    navigation.navigate('BookRecSummary', { likedBooks: likedBooks, sortingAlgo: sortingAlgo, sortTimes: sortTimes, canReturn: false });
  }, [likedBooks, navigation, sortTimes]);

  const handleDislike = useCallback(() => {
    console.log("Left swipe.");
    swiperRef.current.swipeLeft();
  }, []);

  const handleLike = useCallback(() => {
    const cardIndex = currentIndex;
    const likedBook = books[cardIndex];
    addLikedBook(likedBook);
    console.log("Like.");
    swiperRef.current.swipeRight();
  }, [currentIndex]);

  const handleViewSaved = useCallback(() => {
    console.log("Viewing saved");
    console.log("likedBooks", likedBooks);
    navigation.navigate('BookRecSummary', { likedBooks: likedBooks, sortingAlgo: sortingAlgo, sortTimes: sortTimes, canReturn: true });
  }, [likedBooks, navigation, sortTimes]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6D2C2A" />
        <Text style={styles.loadingText}>Please be patient, we are carefully crafting your book recommendations</Text>
        <View style={styles.loadingMessages}>
          {loadingMessages.map((message, index) => (
            <Text key={index} style={styles.loadingMessage}>{message}</Text>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={images.logo} style={styles.logo} />
      </View>

      <View style={styles.middleContainer}>
        {books.length > 0 ? (
          <Swiper
            ref={swiperRef}
            cards={books} 
            renderCard={(card) => (
              <View style={styles.card}>
                <Text style={styles.text}>{card.title}</Text>
                <Text style={styles.subjects}>{card.subjects}</Text>
              </View>
            )}
            onSwipedAll={handleSwipedAll}
            cardIndex={0}
            stackSize={3}
            containerStyle={styles.swiperContainer}
            onSwipedLeft={() => setCurrentIndex(prevIndex => prevIndex + 1)}
            onSwipedRight={() => {
              setCurrentIndex(prevIndex => prevIndex + 1);
            }}
          />
        ) : (
          <Text>No books available</Text>
        )}
      </View>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bookshelfButton} onPress={handleViewSaved}>
          <Image source={images.bookshelf} style={styles.bookshelf} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.heart} onPress={handleLike}>
          <Image source={images.heart} style={styles.icons} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',
    position: 'relative',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'relative',
    marginBottom: -20,
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 175,
    resizeMode: 'contain', 
  },
  middleContainer: {
    backgroundColor: 'black',
    zIndex: 2,
    position: 'relative',
    flex: 1,
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: '#F5E6E1',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    position: 'relative',
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    height: 475,
    borderRadius: 10,
    padding: 25,
    marginTop: -30,
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
    position: 'absolute',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
  },
  subjects: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    fontFamily: 'Roboto-Italic',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: 60,
    paddingVertical: 10,
    marginBottom: 60,
    bottom: 0, 
    left: '10%', 
    zIndex: 4,
    position: 'absolute',
  },
  bookshelfButton: {
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 20,
  },
  bookshelf: {
    width: 80,
    height: 70,
  },
  icons: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E6E1',
  },
  loadingText: {
    fontSize: 18,
    color: '#6D2C2A',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  loadingMessages: {
    alignItems: 'center',
  },
  loadingMessage: {
    fontSize: 16,
    color: '#6D2C2A',
    fontFamily: 'Roboto-Regular',
    marginTop: 10,
  },
});

export default Swiping;
