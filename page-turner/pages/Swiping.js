import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation, useRoute } from '@react-navigation/native';

const Swiping = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { book_id } = route.params;

  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        let response = await fetch(`https://actual-terribly-longhorn.ngrok-free.app/similar-books/${book_id}`);
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
    navigation.navigate('BookRecSummary', { likedBooks: likedBooks.map(book => book.title) });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="brown" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {books.length > 0 ? (
        <Swiper
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
        <Text>No books available</Text>
      )}
      <TouchableOpacity style={styles.dislikeButton} onPress={() => console.log('Swiped Left')}>
        <Text style={styles.buttonText}>{"</3"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.likeButton} onPress={handleSwipeRight}>
        <Text style={styles.buttonText}>{"<3"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  subjects: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  dislikeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 60, // Center text vertically
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Swiping;
