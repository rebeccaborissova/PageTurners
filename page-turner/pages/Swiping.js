import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import images from '../constants/images';

const Swiping = ({navigation, route}) => {
  const { book_id } = route.params;
  const { sortingAlgorithm } = route.params;  

  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        let response = await fetch(`https://actual-terribly-longhorn.ngrok-free.app/test`);
        let data = await response.json();

        const similarBooks = data.similar_books.map(item => ({
          id: item.book.id,
          title: item.book.title,
          author: item.book.authors[0] || 'Unknown Author',
          subjects: item.book.subjects.join(', ') || 'Unknown Subjects'
        }));

        setBooks(similarBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [book_id]);

  const handleSwipeRight = (cardIndex) => {
    const likedBook = books[cardIndex];
    setLikedBooks((prevLikedBooks) => [...prevLikedBooks, likedBook]);
  };

  const handleSwipedAll = () => {
    console.log('All cards swiped');
    console.log('Liked Books:', likedBooks);
    navigation.navigate('BookRecSummary', {likedBooks: likedBooks, sortingAlgorithm});
  };

  const handleDislike = () => {
    console.log("Left swipe.");
    swiperRef.current.swipeLeft();
  }

  const handleLike = () => {
    console.log("Right swipe.");
    swiperRef.current.swipeRight();
  }

  const handleViewSaved = () => {
    console.log("Viewing saved");
    navigation.navigate('BookRecSummary', {likedBooks: likedBooks, sortingAlgorithm});
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6D2C2A" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* adding top container */}
      <View style = {styles.topContainer}>
        <Image source = {images.logo} style = {styles.logo} />
      </View>
      

      <View style = {styles.middleContainer}>
        {/* items within the card */}
        {books.length > 0 ? (
          <Swiper
            cards={books} 
            renderCard={(card) => (
              <View style={styles.card}>
                <Text style={styles.text}>
                  {card.title}
                </Text>
                <Text style={styles.subjects}>{card.subjects}</Text>
              </View>
            )}
            onSwipedRight={handleSwipeRight}
            onSwipedAll={handleSwipedAll}
            cardIndex={0}
            stackSize={3}
            containerStyle={styles.swiperContainer} 
          />
        ) : (
          <Text>No books available</Text>
        )}
      </View> 
     
      
      {/* love, dislike, view library */}
      <View style = {styles.bottomContainer}>
        <TouchableOpacity style = {styles.x_icon} onPress={handleDislike}>
          <Image source={images.x_icon} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity style = {styles.bookshelfButton} onPress={handleViewSaved}>
          <Image source={images.bookshelf} style={styles.bookshelf} />
        </TouchableOpacity>

        <TouchableOpacity style = {styles.heart} onPress={handleLike}>
          <Image source={images.heart} style={styles.icons} />
        </TouchableOpacity>
      </View>

    </View> // overall container
  );
};

const styles = StyleSheet.create({
  // overall container
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',
    position: 'relative',
  },

  // top container
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

  // middle container (card portions)
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
  },
  subjects: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    fontFamily: 'Roboto-Italic',
  },


  // bottom container (likes, dislikes, library)
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
  },
});

export default Swiping;
