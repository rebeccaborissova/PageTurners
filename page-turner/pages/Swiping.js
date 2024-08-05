// Swiping.js
/*import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { cards } from '../components/cards'

const Swiping = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { bookName } = route.params
  const [likedBooks, setLikedBooks] = useState([])

  const filteredCards = cards.filter(card => card.title === bookName)

  const handleSwipeRight = (cardIndex) => {
    setLikedBooks([...likedBooks, filteredCards[cardIndex]])
  }

  return (
    <View style={styles.container}>
      <Swiper
        cards={filteredCards}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.text}>{card.title}, {card.author}</Text>
          </View>
        )}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedRight={(cardIndex) => { handleSwipeRight(cardIndex) }}
        onSwipedAll={() => {
          console.log('All cards swiped')
          navigation.navigate('BookRecSummary', { likedBooks })
        }}
        cardIndex={0}
        backgroundColor={'#f0f1f2'}
        stackSize={3}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.dislikeText}>←Dislike</Text>
        <Button
          title="Book Recommendation Library"
          onPress={() => navigation.navigate('BookRecSummary', { likedBooks })}
        />
        <Text style={styles.likeText}>Like→</Text>
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
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'absolute',
    bottom: 20,
  },
  dislikeText: {
    color: 'red',
    marginRight: 10,
  },
  likeText: {
    color: 'green',
    marginLeft: 10,
  },
})

export default Swiping*/

// Swiping.js
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cards } from '../components/cards';

const Swiping = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookName } = route.params;
  const [likedBooks, setLikedBooks] = useState([]);

  // Filter cards only once when the component is first rendered
  const filteredCards = useMemo(
    () => cards.filter((card) => card.title.includes(bookName)),
    [bookName]
  );

  const handleSwipeRight = (cardIndex) => {
    const likedBook = filteredCards[cardIndex];
    setLikedBooks((prevLikedBooks) => [...prevLikedBooks, likedBook]);
  };

  const handleSwipedAll = () => {
    console.log('All cards swiped');
    navigation.navigate('BookRecSummary', { likedBooks: likedBooks.map(book => book.title) });
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={filteredCards}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.text}>
              {card.title}, {card.author}
            </Text>
          </View>
        )}
        onSwipedRight={handleSwipeRight}
        onSwipedAll={handleSwipedAll}
        cardIndex={0}
        backgroundColor={'#f0f1f2'}
        stackSize={3}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.dislikeText}>←Dislike</Text>
        <Button
          title="Book Recommendation Library"
          onPress={() => navigation.navigate('BookRecSummary', { likedBooks })}
        />
        <Text style={styles.likeText}>Like→</Text>
      </View>
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
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'absolute',
    bottom: 20,
  },
  dislikeText: {
    color: 'red',
    marginRight: 10,
  },
  likeText: {
    color: 'green',
    marginLeft: 10,
  },
});

export default Swiping;



