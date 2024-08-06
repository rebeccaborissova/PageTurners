import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import images from '../constants/images';
import { useNavigation, useRoute } from '@react-navigation/native';

const Swiping = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sortingAlgo, bookId, shouldFetch } = route.params;

  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortTimes, setSortTimes] = useState({ timSort: 0, radixSort: 0 });
  const [showPopup, setShowPopup] = useState(true);
  const swiperRef = useRef(null);

  const [loadingMessage, setLoadingMessage] = useState("Flipping through pages...");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      const messages = [
        "Flipping through pages...",
        "Analyzing books...",
        "Curating the best reads...",
        "Almost done..."
      ];

      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        setLoadingMessage(messages[messageIndex]);
        if (messages[messageIndex] === "Almost done...") {
          clearInterval(messageInterval);
        } else {
          messageIndex = (messageIndex + 1) % messages.length;
        }
      }, 10000);

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
        console.error("Error fetching books:", error);
      } finally {
        clearInterval(messageInterval);
        setLoading(false);
        showWelcomePopup();
      }
    };

    if(shouldFetch) fetchBooks();
  }, [bookId]);

  const showWelcomePopup = () => {
    Alert.alert(
      "Welcome!",
      "Press the heart to like a book, swipe left or right to skip. Your liked books will be saved for you to view later!",
      [
        { text: "Got it!", onPress: () => setShowPopup(false) }
      ]
    );
  };

  const addLikedBook = useCallback((book) => {
    setLikedBooks((prevLikedBooks) => {
      if (!prevLikedBooks.some(likedBook => likedBook.id === book.id)) {
        return [...prevLikedBooks, book];
      }
      return prevLikedBooks;
    });
  }, []);

  const handleSwipeRight = useCallback((cardIndex) => {
    const likedBook = books[cardIndex];
    addLikedBook(likedBook);
  }, [books, addLikedBook]);

  const handleSwipedAll = useCallback(() => {
    console.log('All cards swiped');
    console.log('Liked Books:', likedBooks);
    navigation.navigate('BookRecSummary', { likedBooks: likedBooks, sortingAlgo: sortingAlgo, sortTimes: sortTimes, canReturn: false });
  }, [likedBooks, navigation, sortTimes]);

  const handleLike = useCallback(() => {
    const cardIndex = currentIndex;
    const likedBook = books[cardIndex];
    addLikedBook(likedBook);
    console.log("Right swipe.");
    swiperRef.current.swipeRight();
  }, [currentIndex, handleSwipeRight]);

  const handleViewSaved = useCallback(() => {
    console.log("Viewing saved");
    console.log("likedBooks", likedBooks);
    navigation.navigate('BookRecSummary', { likedBooks: likedBooks, sortingAlgo: sortingAlgo, sortTimes: sortTimes, canReturn: true });
  }, [likedBooks, navigation, sortTimes]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Image source={images.logo} style={styles.loadingLogo} />
          <ActivityIndicator size="large" color="#6D2C2A" style={styles.loadingIndicator} />
          <View style={styles.loadingTextContainer}>
            <Text style={styles.loadingTitle}>Please be patient, we are carefully crafting your book recommendations</Text>
            <Text style={styles.loadingText}>{loadingMessage}</Text>
          </View>
        </View>
      </View>
    );
  }

  if (!loading && showPopup) {
    return null;
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
            onSwipedRight={(cardIndex) => {
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
    backgroundColor: '#F5E6E1',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  loadingLogo: {
    width: 150,
    height: 131,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  loadingTextContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto-Bold',
  },
  loadingIndicator: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});

export default Swiping;