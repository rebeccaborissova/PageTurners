// Swiping.js
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { useNavigation } from '@react-navigation/native'

const cards = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
  },
  {
    title: 'Diary of a Wimpy Kid',
    author: 'Jeff Kinney',
  },
]

const Swiping = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.text}>{card.title}, {card.author}</Text>
          </View>
        )}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedAll={() => { 
          console.log('All cards swiped')
          navigation.navigate('BookRecSummary')
        }}
        cardIndex={0}
        backgroundColor={'#f0f1f2'}
        stackSize={3}
      />
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
})

export default Swiping
