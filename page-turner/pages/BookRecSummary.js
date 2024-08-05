// BookRecSummary.js
import React from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const BookRecSummary = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { likedBooks } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Books</Text>
      <FlatList
        data={likedBooks}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookText}>{item.title}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sorting Algorithm Timer" onPress={() => navigation.navigate('TimerResults')} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 100,
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
})

export default BookRecSummary
