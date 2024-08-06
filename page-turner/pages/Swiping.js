import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';

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
    navigation.navigate('BookRecSummary', {likedBooks: likedBooks});
  };

  const handleLikePress = () => {
    swiperRef.current.swipeRight();
  };

  const handleDislikePress = () => {
    swiperRef.current.swipeLeft();
  };

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
      {books.length > 0 ? (
        <Swiper
          ref={swiperRef}
          cards={books}
          renderCard={(card) => (
            <View style={styles.card}>
              <Text style={styles.text}>
                {card.title}, {card.author}
              </Text>
              <Text style={styles.subjects}>{card.subjects}</Text>
            </View>
          )}
          onSwipedRight={handleSwipeRight}
          onSwipedAll={handleSwipedAll}
          cardIndex={0}
          backgroundColor={'#f0f1f2'}
          stackSize={3}
        />
      ) : (
        <Text style={styles.noBooksText}>No books available</Text>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.dislikeButton} onPress={handleDislikePress}>
          <Text style={styles.buttonText}>{"</3"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
          <Text style={styles.buttonText}>{"<3"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6D2C2A',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto-Medium',
    color: '#6D2C2A',
  },
  subjects: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    fontFamily: 'Roboto-Regular',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  dislikeButton: {
    backgroundColor: '#6D2C2A',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    backgroundColor: '#6D2C2A',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Roboto-Black',
  },
  noBooksText: {
    fontSize: 18,
    color: '#6D2C2A',
    fontFamily: 'Roboto-Medium',
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
