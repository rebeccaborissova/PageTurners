import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import Swiper from 'react-native-deck-swiper'

const cards = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling'
  },
  {
    title: 'Farenheit 451',
    author: 'Ray Bradbury',
  },
  {
    title: 'Diary of a Wimpy Kid',
    author: 'Jeff Kinney',
  },
]


const App = () => {
  // use state of different screens
  const [showSwiper, setShowSwiper] = useState(false)

  // home screen component
  const HomeScreen = () => (
    <View style = {styles.container}>
      <Text style={styles.title}>PageTurner</Text>
      <Text style={styles.description}>
        Welcome to PageTurner! Discover a variety of book recommendations based on your favorite book with just a swipe. 
      </Text>
      <View style={styles.buttonContainer}>
        <Button title = "Login" onPress={() => setShowSwiper(true)} />
          <Button title = "Quit" onPress={() => console.log('Quit')} />
      </View>
    </View>
  )

  // swiper screen component
  const SwiperScreen = () => (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.text}>{card.title}, {card.author}</Text>
          </View>
        )}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedAll={() => { console.log('All cards swiped') }}
        cardIndex={0}
        backgroundColor={'#f0f1f2'}
        stackSize={3}
      />
    </View>
  )

  return showSwiper ? <SwiperScreen /> : <HomeScreen />
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
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
})

export default App
